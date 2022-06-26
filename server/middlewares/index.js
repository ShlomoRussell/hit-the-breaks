const jwtMiddleware = require("./jwt.middleware");
const isAdminMiddleware = require("./admin.middleware");
const isUserMiddleware = require("./user.middleware");
const {
  validateRegisterMiddleware,
  validateLoginMiddleware,
  validatedVacationMiddleware,
} = require("../middlewares/validationMiddlewares");

module.exports = {
  jwtMiddleware,
  isAdminMiddleware,
  isUserMiddleware,
  validateRegisterMiddleware,
  validateLoginMiddleware,
  validatedVacationMiddleware,
};
