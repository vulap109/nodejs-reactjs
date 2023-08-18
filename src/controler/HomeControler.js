const handleHome = (req, res) => {
  // render string
  // return res.send("hello world");

  // render views
  return res.render("home.ejs");
};

module.exports = {
  handleHome,
};
