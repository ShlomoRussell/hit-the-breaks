import { Router } from "express";
import jwt from "jsonwebtoken";
import { hash as _hash, compare } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { getUserByUsernameOrEmail, addUser } from "../bl/index.js";
import { validateRegisterMiddleware, validateLoginMiddleware } from "../middlewares/index.js";
import dotenv from "dotenv";
dotenv.config();
const auth = Router();
const saltRounds = 10;

auth.post("/register", validateRegisterMiddleware, async (req, res) => {
  const hash = await _hash(req.body.password, saltRounds);

  try {
    const newUser = await addUser({
      ...req.body,
      password: hash,
      id: uuidv4(),
    });

    if (newUser) {
      const token = jwt.sign(
        { username: req.body.username, id: newUser.id },
        process.env.SECRET_KEY
      );
      res.status(201).json({ token, id: newUser.id });
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

    const result = await compare(password, user.password);
    if (!result) return res.status(404).send("Incorrect password!");

    const token = sign(
      { username: req.body.username, id: user.id },
      process.env.SECRET_KEY
    );
    res.status(201).json({ id: user.id, token: token });
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

export default auth;
