import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

export default function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.headers.id = payload.id;
    next();
  } catch (ex) {
    return res.status(401).send();
  }
};
