import Joi from "joi";

function validateRegisterMiddleware(req, res, next) {
  const registerSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    username: Joi.string().min(3).max(40).required(),
    password: Joi.string().min(6).max(40).required(),
    firstName: Joi.string().min(3).max(40).required(),
    lastName: Joi.string().min(3).max(40).required(),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .error(new Error("Confirm Password and password must match")),
  });

  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  delete value["confirmPassword"];
  req.body = value;
  next();
}

function validateLoginMiddleware(req, res, next) {
  const loginSchema = Joi.object({
    username: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().required(),
  }).xor("username", "email");

  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  next();
}

function validatedVacationMiddleware(req, res, next) {
  if (req.files && Object.keys(req.body).length === 0) return next();

  const vacationSchema = Joi.object({
    description: Joi.string().min(10).max(36000),
    destination: Joi.string().min(3).max(60),
    startDate: Joi.date(),
    endDate: Joi.date(),
    price: Joi.number().precision(2),
  }).alter({
    POST: (schema) => schema.required(),
    PUT: (schema) =>
      schema.min(1).error(new Error("You must change at least one thing")),
  });

  const { error, value } = vacationSchema.tailor(req.method).validate(req.body);
  req.body = value;
  if (error) return res.status(400).send(error.message);

  next();
}
export {
  validateLoginMiddleware,
  validateRegisterMiddleware,
  validatedVacationMiddleware,
};
