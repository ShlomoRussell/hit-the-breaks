class UserModel {
  /**
   * @param {string} id
   * @param {string} email
   * @param {string} username
   * @param {string} password
   * @param {string} firstName
   * @param {string} lastName
   * @param {boolean} isAdmin
   */
  constructor(email, username, firstName, lastName, id, isAdmin, password) {
    this.email = email;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.password = password;
    this.isAdmin = !!isAdmin;
  }
}

export default UserModel;
