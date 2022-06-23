const {createPool}=require("mysql")

const pool = createPool({
  connectionLimit: 100, //important
  host: "localhost",
  user: "root",
  password: "",
  database: "hit_the_breaks",
  debug: false,
});

const getUserByUsername = async (payload) => {
  const selectBy = payload.username ? "username" : 'email'; 
 return new Promise((res, rej) => {
   pool.query(
     `SELECT * FROM users WHERE ${selectBy} = ?`,
     payload.username||payload.email,
     (err, data) => {
       if (err) return rej(err);
       if (data.length === 0) return rej(new Error("Username not found!"));
       return res(data.map(d=>({...d}))[0]);
     }
   );
 }) 
};


const addUser = async (newUser) => {
  const newUserValues = Object.values(newUser);
  console.log(newUserValues)
  return new Promise((res, rej) => {
    pool.query(
      "INSERT INTO `users`(`email`,`username`,`first_name`, `last_name`, `password`,`id`) VALUES (?,?,?,?,?,?)",
      newUserValues,
      (err, data) => {
        if (err) return rej(err);
        res(data);
      }
    );
  })
}
module.exports= { getUserByUsername, addUser };
