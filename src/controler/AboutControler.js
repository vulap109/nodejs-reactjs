import userService from "../service/userService";

const handleAbout = (req, res) => {
  // render views
  return res.render("about.ejs");
};

const handleCreateUser = (req, res) => {
  console.log(">>> check request: ", req.body);
  let userName = req.body.userName;
  let email = req.body.email;
  let password = req.body.password;
  if (userName && email && password) {
    userService.createUser(email, password, userName);
  }

  return res.redirect("/users/list");
};

const handleListUsers = async (req, res) => {
  let users = [];
  users = await userService.getUsersList();
  console.log("check get users: ", users);
  // render views
  return res.render("listUsers.ejs", { users: users });
};

const handleDeleteUser = async (req, res) => {
  console.log(">>> check get params, ", req.params.id);
  await userService.deleteUser(req.params.id);
  return res.redirect("/users/list");
};

module.exports = {
  handleAbout,
  handleCreateUser,
  handleListUsers,
  handleDeleteUser,
};
