const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const fileUpload = require("express-fileupload");
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
module.exports = vacations;
