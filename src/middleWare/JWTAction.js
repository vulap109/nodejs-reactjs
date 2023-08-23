import jwt from "jsonwebtoken";
require("dotenv").config();

const createJWT = (data) => {
  let token = null;
  try {
    token = jwt.sign(data, process.env.JWT_SECRET_KEY);
  } catch (error) {
    console.log("Error createJWT: ", error);
  }
  return token;
};

const verifyToken = (token) => {
  let verify = null;
  try {
    // verify a token symmetric
    verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    console.log("Error verifyToken: ", error);
  }
  return verify;
};

const checkUserJWT = (req, res, next) => {
  let cookies = req.cookies;
  if (cookies && cookies.access_token) {
    let decode = verifyToken(cookies.access_token);
    if (decode) {
      req.user = decode;
      next();
    }
  }
  return res.status(401).json({
    result: false,
    message: "Unauthoried",
  });
};

module.exports = {
  createJWT,
  verifyToken,
  checkUserJWT,
};
