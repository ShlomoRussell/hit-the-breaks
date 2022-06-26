const {
  dalGetAllVactaions,
  dalCheckIfisAdmin,
  dalAddVacation,
  dalUpdateVacation,
} = require("../dal/dal");
const { VacationModel } = require("../models");

async function getAllVacations() {
  try {
    const vacations = await dalGetAllVactaions();
    return vacations.filter((d) => Array.isArray(d))[0].map((d) => ({ ...d }));
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addVacation(payload) {
  const vacation = new VacationModel(...Object.values(payload));
  try {
    dalAddVacation(Object.values(vacation));
  } catch (error) {
    throw new Error(error.message);
  }
}

async function checkIfIsAdmin(id) {
  try {
    const res = await dalCheckIfisAdmin(id);
    const isAdmin = res
      .filter((d) => Array.isArray(d))[0]
      .map((d) => d.isAdmin)[0];
    if (isAdmin) return true;
    return false;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getAllVacations,
  addVacation,
  checkIfIsAdmin,
};
