import userAPI from "../service/userAuthService";

const testAPI = (req, res) => {
  return res.status(200).json({
    result: true,
    data: "data test",
  });
};

// API register user
const regesterAPI = async (req, res) => {
  try {
    // check data required
    if (!req.body.email || !req.body.userName || !req.body.password) {
      return res.status(200).json({
        result: false,
        message: "missing required parameters",
        data: "",
      });
    }
    // call service registeruser
    let data = await userAPI.registerUser(req.body);
    // return case success
    return res.status(200).json(data);
  } catch (error) {
    // return case error
    return res.status(500).json({
      result: false,
      message: "error form server",
      data: "",
    });
  }
};

const loginAPI = async (req, res) => {
  try {
    // check data required
    if (!req.body.account || !req.body.password) {
      return res.status(200).json({
        result: false,
        message: "your email/phone or password is required!",
      });
    }

    // call service registeruser
    let data = await userAPI.loginUser(req.body);
    res.cookie("access_token", data.access_token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });
    // return case success
    return res.status(200).json(data);
  } catch (error) {
    // return case error
    return res.status(500).json({
      result: false,
      message: "error form server",
    });
  }
};

module.exports = {
  testAPI,
  regesterAPI,
  loginAPI,
};
