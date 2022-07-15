import express, { urlencoded, json } from "express";
import {
  authRouter,
  vacationsRouter,
  reportsRouter,
} from "./controllers/index.js";
import { jwtMiddleware } from "./middlewares/index.js";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import dotenv from "dotenv";
import { socketHandler } from "./socket/socketHandler.js";
dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server);
io.on("connection", socketHandler);
app.use(urlencoded({ extended: true }));
app.use(json());

app.use(express.static("public"));
app.use("/images", express.static("uploads"));
app.use("/auth", authRouter);
app.use("/api/", jwtMiddleware);
app.use("/api/vacations", vacationsRouter);
app.use("/api/reports", reportsRouter);
app.get("*", function (req, res) {
  res.sendFile(path.join(process.cwd(), "/public/index.html"));
});

server.listen(process.env.PORT, () =>
  console.log(`started at ${process.env.PORT}`)
);
