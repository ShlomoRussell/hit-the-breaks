const { createPool } = require("mysql");
const { promisify } = require("util");

const pool = createPool({
  connectionLimit: 100, //important
  host: "localhost",
  user: "root",
  password: "",
  database: "hit_the_breaks",
  debug: false,
});

const queryAsync = promisify(pool.query).bind(pool);

const getUserByUsernameOrEmail = async (payload) =>
  await queryAsync("CALL `SELECT_USER`(?);", payload.username || payload.email);

const addUser = async (newUser) =>
  queryAsync("CALL `ADD_USER`(?, ?, ?, ?, ?, ?);", newUser);

const dalGetAllVactaions = async () =>
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

const unFollowVacation = async (ids) => queryAsync("CALL `UNFOLLOW_VACATION`(?,?)",ids);
module.exports = {
  getUserByUsernameOrEmail,
  addUser,
  dalGetAllVactaions,
  dalCheckIfisAdmin,
  dalAddVacation,
  updateVacation,
  deleteVacation,
  followVacation,
  unFollowVacation,
};
