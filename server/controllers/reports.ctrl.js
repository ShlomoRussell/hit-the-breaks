const { Router } = require("express");
const { getFollowerReports } = require("../bl");
const { isAdminMiddleware } = require("../middlewares");

const reports = Router();

reports.use(isAdminMiddleware);
reports.get("/", async (req, res) => {
  try {
    const reports = await getFollowerReports();
    return res.send(reports);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = reports;
