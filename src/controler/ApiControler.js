import userAPI from "../service/userAPI";

const testAPI = (req, res) => {
  return res.status(200).json({
    result: true,
    data: "data test",
  });
};

const regesterAPI = async (req, res) => {
  try {
    if (!req.body.email || !req.body.userName || !req.body.password) {
      return res.status(200).json({
        result: false,
        message: "missing required parameters",
        data: "",
      });
    }
    let data = await userAPI.registerUser(req.body);

    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      message: "error form server",
      data: "",
    });
  }
};

module.exports = {
  testAPI,
  regesterAPI,
};
