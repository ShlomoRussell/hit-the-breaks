import { Router } from "express";
import jwt from "jsonwebtoken";
import { hash as _hash, compare } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { getUserByUsernameOrEmail, addUser } from "../bl/index.js";
import {
  validateRegisterMiddleware,
  validateLoginMiddleware,
  jwtMiddleware,
} from "../middlewares/index.js";
import dotenv from "dotenv";
import { getUserById } from "../bl/users.bl.js";
dotenv.config();
const auth = Router();
const saltRounds = 10;

auth.get("/user/refresh", jwtMiddleware, async (req, res) => {
  const id = req.headers.id;
  const token = req.headers.authorization.split(" ")[1];
  try {
    const user = await getUserById(id);
    console.log(user)
    delete user.password
    return res.send({ ...user, token });
  } catch (error) {
    return res.sendStatus(500);
  }
});

auth.post("/register", validateRegisterMiddleware, async (req, res) => {
  const hash = await _hash(req.body.password, saltRounds);
  try {
    const newUser = await addUser({
      ...req.body,
      id: uuidv4(),
      password: hash,
    });

    if (newUser) {
      const token = jwt.sign(
        { username: newUser.username, id: newUser.id },
        process.env.SECRET_KEY
      );
      delete newUser.password;
      res.status(201).json({ token, ...newUser });
    }
  } catch (error) {
    if (error.message.split(" ")[1] === "Duplicate") {
      return res
        .status(409)
        .send("Username already exist! Please try a different one!");
    }
    console.log(error.message);
    return res.sendStatus(500);
  }
});

auth.post("/login", validateLoginMiddleware, async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await getUserByUsernameOrEmail({ username, email });
    if (user === undefined)
      throw new Error(`${username ? "username" : "email"} not found!`);

    const result = await compare(password, user.password);
    console.log(user);
    if (!result) return res.status(404).send("Incorrect password!");

    const token = jwt.sign(
      { username: req.body.username, id: user.id },
      process.env.SECRET_KEY
    );
    delete user.password;
    res.status(201).json({ ...user, token: token });
  } catch (error) {
    console.log(error);
    return res.status(404).send(error.message);
  }
});

export default auth;
