import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

const sqlExec = async (query, data = []) => {
  // create the connection
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "nodejs",
  });
  // query database
  const [rows, fields] = await connection.execute(query, data);
  return rows;
};
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "nodejs",
// });

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  // hash password
  return bcrypt.hashSync(password, salt);
};

const createUser = async (email, password, userName) => {
  let hashPass = hashPassword(password);
  const query = "INSERT INTO users (username, email, password) VALUES (?,?,?)";
  const data = [userName, email, hashPass];
  const result = await sqlExec(query, data);
  console.log(">> check result query: ", result);
  // connection.query(
  //   "INSERT INTO users (username, email, password) VALUES (?,?,?)",
  //   [userName, email, hashPass],
  //   (err, result, fields) => {
  //     if (err) {
  //       console.log(">> check error query: ", err);
  //     }
  //     console.log(">> check result query: ", result);
  //   }
  // );
};

const getUsersList = async () => {
  let user = [];
  // connection.query("SELECT * FROM users", (err, result, fields) => {
  //   if (err) {
  //     console.log(">> check error query: ", err);
  //     return user;
  //   }
  //   user = result;
  // });
  const query = "SELECT * FROM users";
  user = await sqlExec(query);
  return user;
};

const deleteUser = async (id) => {
  let user = [];
  const query = "DELETE FROM users WHERE id = ?";
  const data = [id];
  user = await sqlExec(query, data);
  return user;
};

module.exports = {
  createUser,
  hashPassword,
  getUsersList,
  deleteUser,
};
