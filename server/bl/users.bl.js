const {
  getUserByUsernameOrEmail: dalGetUserByUsernameOrEmail,
  addUser: dalAddUser,
} = require("../dal/dal");
const { UserModel } = require("../models");

async function getUserByUsernameOrEmail(payload) {
  try {
    const data = await dalGetUserByUsernameOrEmail(payload).then((data) => {
      if (data.length === 0) throw new Error("Username not found!");
      return data.filter((d) => Array.isArray(d))[0].map((d) => ({ ...d }))[0];
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addUser(payload) {
  const newUser = new UserModel(...Object.values(payload));
  try {
    await dalAddUser(Object.values(newUser));
    return newUser;
  } catch (error) {
    throw new Error(error.sqlMessage);
  }
}

module.exports = { getUserByUsernameOrEmail, addUser };
