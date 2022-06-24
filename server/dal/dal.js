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

const getUserByUsernameOrEmail = async (payload) => {
  return await queryAsync(
    "CALL `SELECT_USER`(?);",
    payload.username || payload.email
  );
};

const addUser = async (newUser) => {
  return queryAsync("CALL `ADD_USER`(?, ?, ?, ?, ?, ?);", newUser);
};

const getAllVacations = async () => {
  return await queryAsync("CALL GET_ALL_VACATIONS();");
};

const checkIfIsAdmin = async (id) => {
  return queryAsync("CALL `CHECK_IF_IS_ADMIN`(?);", id);
};

const addVacation = (vacation) => {
  return queryAsync("CALL `ADD_VACATION`(?, ?, ?, ?, ?, ?);", vacation);
};

module.exports = {
  getUserByUsernameOrEmail,
  addUser,
  getAllVacations,
  checkIfIsAdmin,
  addVacation,
};
