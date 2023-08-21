import db from "../models";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
  // hash password
  return bcrypt.hashSync(password, salt);
};

const checkEmail = async (email) => {
  let user = await db.User.findOne({
    where: { email: email },
  });

  if (user) {
    return true;
  }
  return false;
};

const registerUser = async (rawUser) => {
  try {
    // console.log(">>> check email exist:", checkEmail(rawUser.email));
    let checkEmailExist = await checkEmail(rawUser.email);
    if (checkEmailExist) {
      return {
        result: false,
        message: "email or username is already exist",
      };
    }
    const hashpass = hashPassword(rawUser.password);

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
    console.log("error service", error);
    return {
      result: false,
      message: "something wrong in service ...",
    };
  }
};

module.exports = {
  registerUser,
};
