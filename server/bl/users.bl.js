import   runQuery from "../dal/dal.js";
import { UserModel } from "../models/index.js";

async function getUserByUsernameOrEmail(payload) {
const sql = "CALL `GET_USER_USERNAME_OR_EMAIL`(?);";
  try {
    const data = await runQuery(sql, payload.username || payload.email).then(
      (data) => {
        console.log(data)
        if (data[0].length === 0) throw new Error("Username not found!");
        return data
          .filter((d) => Array.isArray(d))[0]
          .map((d) => ({ ...d }))[0];
      }
    );
   return new UserModel(...Object.values(data))
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getUserById(payload) {
  const sql = "CALL `GET_USER_BY_ID`(?);";
  try {
    const data = await runQuery(sql,payload).then((data) => {
      if (data.length === 0) throw new Error("Username not found!");
      return data.filter((d) => Array.isArray(d))[0].map((d) => ({ ...d }))[0];
    });
    return new UserModel(...Object.values(data));
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addUser(payload) {
  const newUser = new UserModel(...Object.values(payload));
  const sql = "CALL `ADD_USER`(?, ?, ?, ?, ?, ?);";
  try {
    await runQuery(sql,Object.values(newUser));
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
}

export { getUserByUsernameOrEmail, addUser, getUserById };
