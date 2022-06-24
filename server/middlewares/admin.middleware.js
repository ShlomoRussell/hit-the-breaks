const { checkIfIsAdmin } = require("../bl");

module.exports = async function (req, res, next) {
  try {
    const res = await checkIfIsAdmin(req.headers.id);
    if (res) next();
  } catch (error) {
    res.status(401).send(error.message);
  }
};
