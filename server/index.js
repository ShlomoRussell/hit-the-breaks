import express, { urlencoded, json } from "express";
import { authRouter, vacationsRouter, reportsRouter } from "./controllers/index.js";
import { jwtMiddleware } from "./middlewares/index.js";
import path from 'path'
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

app.use(express.static("static"));
app.use('/images',express.static('uploads'))
app.use("/auth", authRouter);
app.use(jwtMiddleware);
app.use("/api/vacations", vacationsRouter);
app.use("/api/reports", reportsRouter);
app.get("*", function (req, res) {
  res.sendFile(path.join(process.cwd(), "/static/index.html"));
});

app.listen(process.env.PORT, () =>
  console.log(`started at ${process.env.PORT}`)
);
