class UserModel {
  email;
  username;
  password;
  firstName;
  lastName;
  id;
  /**
   * @param {string} id
   * @param {string} email
   * @param {string} username
   * @param {string} password
   * @param {string} firstName
   * @param {string} lastName
   */
  constructor(email, username,  firstName, lastName,password, id) {
    this.email = email;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.id = id;
  }
}

module.exports = UserModel;
