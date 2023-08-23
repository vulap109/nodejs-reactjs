import db from "../models";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { createJWT } from "../middleWare/JWTAction";

const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
  // hash password
  return bcrypt.hashSync(password, salt);
};

// check email is exist?
const checkEmail = async (email) => {
  let user = await db.User.findOne({
    where: { email: email },
  });
  // if has one return true
  if (user) {
    return true;
  }
  return false;
};

// sevice register user
const registerUser = async (rawUser) => {
  try {
    // console.log(">>> check email exist:", checkEmail(rawUser.email));
    let checkEmailExist = await checkEmail(rawUser.email);
    // if email is exist then return false
    if (checkEmailExist) {
      return {
        result: false,
        message: "email or username is already exist",
      };
    }
    // check lenght of password
    if (rawUser.password.length < 4) {
      return {
        result: false,
        message: "password have must more than 3 letter",
      };
    }
    // hash password
    const hashpass = hashPassword(rawUser.password);

    // ORM create user
    await db.User.create({
      email: rawUser.email,
      username: rawUser.userName,
      password: hashpass,
      phone: rawUser.phone,
      address: rawUser.address,
      gender: rawUser.gender,
    });
    return {
      result: true,
      message: "update user successfully",
    };
  } catch (error) {
    // return error if ORM create user has catch
    console.log("error service", error);
    return {
      result: false,
      message: "something wrong in service ...",
    };
  }
};

// check hash password
const checkHashPassword = (inputPass, hashPass) => {
  return bcrypt.compareSync(inputPass, hashPass);
};

const loginUser = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.account }, { phone: rawData.account }],
      },
    });

    if (user) {
      // check hash password
      const checkPassword = checkHashPassword(rawData.password, user.password);
      if (checkPassword) {
        let payload = { email: user.email, phone: user.phone };
        let token = createJWT(payload);
        // return when login success
        return {
          result: true,
          message: "Login success!",
          access_token: token,
        };
      }
      console.log(">>> check login user:", user.get({ plain: true }));
    }
    // default return falled
    return {
      result: false,
      message: "your email/phone or password is incorrect!",
    };
  } catch (error) {
    // return error
    console.log("error service login", error);
    return {
      result: false,
      message: "something wrong in service ...",
    };
  }
};

module.exports = {
  registerUser,
  loginUser,
};
