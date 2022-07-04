import { createPool } from "mysql";
import { promisify } from "util";

const pool = createPool({
  connectionLimit: 100, //important
  host: "localhost",
  user: "root",
  password: "",
  database: "hit_the_breaks",
  debug: false,
});

const queryAsync = promisify(pool.query).bind(pool);

const dalGetUserByUsernameOrEmail = async (payload) =>
  await queryAsync(
    "CALL `GET_USER_USERNAME_OR_EMAIL`(?);",
    payload.username || payload.email
  );

const dalGetUserById = async (id) =>
  await queryAsync("CALL `GET_USER_BY_ID`(?);", id);

const dalAddUser = async (newUser) =>
  queryAsync("CALL `ADD_USER`(?, ?, ?, ?, ?, ?);", newUser);

const dalGetAllVacations = async () =>
  await queryAsync("CALL GET_ALL_VACATIONS();");

const dalCheckIfisAdmin = async (id) =>
  queryAsync("CALL `CHECK_IF_IS_ADMIN`(?);", id);

const dalAddVacation = async (vacation) =>
  queryAsync("CALL `ADD_VACATION`(?, ?, ?, ?, ?, ?);", vacation);

const updateVacation = async (update, id) =>
  queryAsync(
    "UPDATE `vacations` SET " +
      Object.keys(update)
        .map((key) => `${key} = ?`)
        .join(", ") +
      " WHERE id = ?",
    [...Object.values(update), id]
  );

const deleteVacation = async (id) =>
  queryAsync("CALL `DELETE_VACATION`(?);", id);

const followVacation = async (ids) =>
  queryAsync("CALL`FOLLOW_VACATION`(?,?);", ids);

const unFollowVacation = async (ids) =>
  queryAsync("CALL `UNFOLLOW_VACATION`(?,?)", ids);

const dalGetFollowerReports = async () =>
  queryAsync("CALL `GET_FOLLOWER_REPORT`()");

const getVacationFollowers = async (vacationId) =>
  queryAsync("CALL `GET_VACATION_FOLLOWERS`(?)", vacationId);

export {
  dalGetUserByUsernameOrEmail,
  dalAddUser,
  dalGetAllVacations,
  dalCheckIfisAdmin,
  dalAddVacation,
  updateVacation,
  deleteVacation,
  followVacation,
  unFollowVacation,
  dalGetFollowerReports,
  getVacationFollowers,
  dalGetUserById,
};
