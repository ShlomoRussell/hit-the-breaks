const jwt = require('jsonwebtoken');
require("dotenv").config()

module.exports = function (req, res, next) {

  try {
      const token = req.headers.authorization.split(" ")[1];
      
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      console.log(payload)
    next();
  } catch (ex) {
    res.status(401).send();
  }
}