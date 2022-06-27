const express = require("express");
const { authRouter, vacationsRouter, reportsRouter } = require("./controllers");
const { jwtMiddleware } = require("./middlewares");
require("dotenv").config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("static"));
app.use('/images',express.static('uploads'))
app.use("/auth", authRouter);
app.use(jwtMiddleware);
app.use("/api/vacations", vacationsRouter);
app.use("/api/reports", reportsRouter);

app.get("*", function (req, res) {
  res.sendFile(require.main.path + "/static/index.html");
});
app.listen(process.env.PORT, () =>
  console.log(`started at ${process.env.PORT}`)
);
