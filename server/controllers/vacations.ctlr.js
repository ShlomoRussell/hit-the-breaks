const { Router } = require("express");
const { getAllVacations, addVacation } = require("../dal/dal");
const Joi = require("joi");
const {adminMiddleware} = require("../middlewares");
const vacations = Router();

vacations.get("/", async (req, res) => {
  try {
    const vacations = await getAllVacations();
    res.send(vacations);
  } catch (error) {
    console.log(error);
  }
});

const vacationSchema = Joi.object({
  desription: Joi.string().min(10).max(36000),
  destination: Joi.string().min(3).max(60).required(),
  picture: Joi.string().min(4).max(100).optional().allow(null),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  price: Joi.number().precision(2),
});

vacations.post("/", adminMiddleware, (req, res) => {
    const { error, value } = vacationSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);
    try {
         addVacation(value);
         res.sendStatus();
    } catch (error) {
        console.log(error)
    }
});

module.exports = vacations;
