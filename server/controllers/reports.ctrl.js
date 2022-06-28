import { Router } from "express";
import { getFollowerReports } from "../bl/index.js";
import { isAdminMiddleware } from "../middlewares/index.js";

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

export default reports;
