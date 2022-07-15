import runQuery from "../dal/dal.js";
import { VacationModel } from "../models/index.js";
import { unlinkSync } from "fs";
import path from "path";
export async function getAllVacations() {
  const sql = "CALL GET_ALL_VACATIONS();";
  try {
    const vacations = await runQuery(sql);
    return vacations
      .filter((data) => Array.isArray(data))[0]
      .map((data) => new VacationModel(...Object.values(data)));
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addVacation(payload) {
  const vacation = new VacationModel(...Object.values(payload));
  const sql = "CALL `ADD_VACATION`(?, ?, ?, ?, ?, ?);";
  console.log(vacation);
  try {
    await runQuery(sql, Object.values(vacation));
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateVacation(update, id) {
  const sql =
    "UPDATE `vacations` SET " +
    Object.keys(update)
      .map((key) => `${key} = ?`)
      .join(", ") +
    " WHERE id = ?";
  try {
    await runQuery(sql, [...Object.values(update), id]);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function deleteVacation(id) {
  const sql = "CALL `DELETE_VACATION`(?);";
  try {
    const res = await runQuery(sql, id);
    const parsedRes = res.filter((p) => Array.isArray(p))[0];
    const vacationPicFileName = Object.assign({}, ...parsedRes).picture;
    unlinkSync(path.join(process.cwd(), "uploads", vacationPicFileName));
    return vacationPic;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function followVacation(ids) {
  const sql = "CALL`FOLLOW_VACATION`(?,?);";
  try {
    await runQuery(sql, ids);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function unFollowVacation(ids) {
  console.log(ids)
  const sql = "CALL `UNFOLLOW_VACATION`(?,?)";
  try {
    await runQuery(sql, ids);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getVacationFollowers(vacationId) {
  const sql = "CALL `GET_VACATION_FOLLOWERS`(?)";
  try {
    const followers = await runQuery(sql, vacationId);
    console.log(followers)
    return followers;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function checkIfIsAdmin(id) {
  const sql = "CALL `CHECK_IF_IS_ADMIN`(?);";
  try {
    const res = await runQuery(sql, id);
    const isAdmin = res
      .filter((d) => Array.isArray(d))[0]
      .map((d) => d.isAdmin)[0];
    if (isAdmin) return true;
    return false;
  } catch (error) {
    throw new Error(error.message);
  }
}
