const { addUser, getUserByUsernameOrEmail } = require('./users.bl');
const { getAllVacations,checkIfIsAdmin,addVacation } = require('./vacations.bl')


module.exports = {
  addUser,
  getUserByUsernameOrEmail,
  getAllVacations,
  checkIfIsAdmin,
  addVacation,
};