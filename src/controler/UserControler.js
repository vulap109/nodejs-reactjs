import userService from "../service/userService";

const getUsersList = async (req, res) => {
  try {
    let usersList = {};
    if (req.query.page && req.query.limit) {
      console.log(">>> check request params: ", req.query);
      usersList = await userService.getUserListPerPage(
        req.query.page,
        req.query.limit
      );
      // return list user per page
      return res.status(200).json(usersList);
    }

    usersList = await userService.getAllUsersList();
    console.log("check get ALL users: ", usersList);
    // return list user
    return res.status(200).json({
      result: true,
      data: usersList,
    });
  } catch (error) {
    // return case error
    return res.status(500).json({
      result: false,
      message: "error form server",
      data: [],
    });
  }
};

module.exports = {
  getUsersList,
};
