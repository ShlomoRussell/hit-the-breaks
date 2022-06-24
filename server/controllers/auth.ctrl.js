const { Router } = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { getUserByUsernameOrEmail, addUser } = require("../bl");
require("dotenv").config();
const auth = Router();
const saltRounds = 10;

const registerSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  username: Joi.string().min(3).max(40).required(),
  password: Joi.string().min(6).max(40).required(),
  firstName: Joi.string().min(3).max(40).required(),
  lastName: Joi.string().min(6).max(40).required(),
  confirmPassword: Joi.ref("password"),
});

auth.post("/register", async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    const errorMessage =
      error.message == '"confirmPassword" must be [ref:password]'
        ? "Confirm Password and password must match"
        : error.message;
    return res.status(400).send(errorMessage);
  }

  const hash = await bcrypt.hash(value.password, saltRounds);

  delete value["confirmPassword"];
  try {
    const newUser = await addUser({ ...value, password: hash, id: uuidv4() });
console.log(newUser);
    if (newUser) {
      const token = jwt.sign(
        { username: value.username, id: newUser.id },
        process.env.SECRET_KEY
      ); res.status(201).json({ token, id: newUser.id });
    }
   
  } catch (error) {
    if (error.message.split(" ")[0] === "Duplicate") {
      return res
        .status(409)
        .send("Username already exist! Please try a different one!");
    }
    console.log(error.message)
    return res.sendStatus(500);
  }
});

const loginSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().required(),
}).xor("username", "email");

auth.post("/login", async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  const { username, email, password } = req.body;

  try {
    const user = await getUserByUsernameOrEmail({ username, email });

    const result = await bcrypt.compare(password, user.password);
    if (!result) return res.status(404).send("Incorrect password!");

    const token = jwt.sign(
      { username: req.body.username, id: user.id },
      process.env.SECRET_KEY
    );
    res.status(201).json({ id: user.id, token: token });
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

module.exports = auth;
