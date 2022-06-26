const { checkIfIsAdmin } = require("../bl");

module.exports = async function (req, res, next) {
  try {
    const res = await checkIfIsAdmin(req.headers.id);
    if (!res)return next();
    throw new Error("Not a valid user")
  } catch (error) {
    return res.status(401).send(error.message);
  }
};
