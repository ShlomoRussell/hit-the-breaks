import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import fileUpload from "express-fileupload";
import { getAllVacations, addVacation } from "../bl/index.js";
import { updateVacation, deleteVacation, followVacation, unFollowVacation } from "../dal/dal.js";
import { isAdminMiddleware, validatedVacationMiddleware, isUserMiddleware } from "../middlewares/index.js";
const vacations = Router();
vacations.use(
  fileUpload({
    createParentPath: true,
  })
);

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
  let newFileName;
  if (req.files) {
    const uploadedfile = req.files.picture;
    newFileName = uuidv4() + "." + uploadedfile.name.split(".")[1];
    const uploadPath = require.main.path + "/uploads/" + newFileName;

    uploadedfile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
    });
  }
  try {
    const payload = { ...req.body, picture: newFileName };
    await addVacation(payload);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

vacations.put("/:vacationId", async (req, res) => {
  const vacationId = req.params.vacationId;
  let newFileName;
  if (req.files) {
    const uploadedfile = req.files.picture;
    newFileName = uuidv4() + "." + uploadedfile.name.split(".")[1];
    const uploadPath = require.main.path + "/uploads/" + newFileName;

    uploadedfile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
    });
  }
  try {
    const payload = newFileName
      ? { ...req.body, picture: newFileName }
      : req.body;

    const isUpdated = await updateVacation(payload, vacationId);
    if (isUpdated) return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
export default vacations;
