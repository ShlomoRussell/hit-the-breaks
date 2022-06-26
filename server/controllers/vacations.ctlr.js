const { Router } = require("express");
const { getAllVacations, addVacation } = require("../bl");
const {
  updateVacation,
  deleteVacation,
  followVacation,
  unFollowVacation,
} = require("../dal/dal");
const {
  isAdminMiddleware,
  validatedVacationMiddleware,
  isUserMiddleware,
} = require("../middlewares");
const vacations = Router();

vacations.get("/", async (req, res) => {
  try {
    const vacations = await getAllVacations();
    return res.send(vacations);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

vacations.use("/follow", isUserMiddleware);

vacations.post("/follow/:vacationId", async (req, res) => {
  const vacationId = req.params.vacationId;
  const userId = req.headers.id;
  try {
    await followVacation([userId, vacationId]);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
vacations.delete("/follow/:vacationId", async (req, res) => {
  const vacationId = req.params.vacationId;
  const userId = req.headers.id;
  try {
    await unFollowVacation([userId, vacationId]);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

vacations.use("/", isAdminMiddleware);

vacations.delete("/:vacationId", async (req, res) => {
  const vacationId = req.params.vacationId;
  try {
    await deleteVacation(vacationId);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

vacations.use("/", validatedVacationMiddleware);

vacations.post("/", async (req, res) => {
  try {
    await addVacation(req.body);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

vacations.put("/:vacationId", async (req, res) => {
  const vacationId = req.params.vacationId;
  try {
    const isUpdated = await updateVacation(req.body, vacationId);
    if (isUpdated) return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
module.exports = vacations;
