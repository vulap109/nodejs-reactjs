import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import db from '../models'

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

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  // hash password
  return bcrypt.hashSync(password, salt);
};

const createUser = async (email, password, userName) => {
  let hashPass = hashPassword(password);
  // const query = "INSERT INTO users (username, email, password) VALUES (?,?,?)";
  // const data = [userName, email, hashPass];
  // const result = await sqlExec(query, data);
  const result = await db.User.create({
    username: userName,
    email: email,
    password: hashPass
  })
};

const getUsersList = async () => {
  let user = [];
  // const query = "SELECT * FROM users";
  // user = await sqlExec(query);
  user = await db.User.findAll();
  return user;
};

const deleteUser = async (id) => {
  let user = [];
  // const query = "DELETE FROM users WHERE id = ?";
  // const data = [id];
  // user = await sqlExec(query, data);
  user = await db.User.destroy({
    where: {
      id: id
    }
  });
  return user;
};

module.exports = {
  createUser,
  hashPassword,
  getUsersList,
  deleteUser,
};
