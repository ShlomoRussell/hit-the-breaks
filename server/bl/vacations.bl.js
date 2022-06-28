import { dalGetAllVactaions, dalCheckIfisAdmin, dalAddVacation } from "../dal/dal.js";
import { VacationModel } from "../models/index.js";

async function getAllVacations() {
  try {
    const vacations = await dalGetAllVactaions();
    return vacations
      .filter((data) => Array.isArray(data))[0]
      .map((data) => new VacationModel(...Object.values(data)));
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addVacation(payload) {
  const vacation = new VacationModel(...Object.values(payload));
  console.log(vacation);
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

export  {
  getAllVacations,
  addVacation,
  checkIfIsAdmin,
};
