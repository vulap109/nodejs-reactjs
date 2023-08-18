import express from "express";
import homeControler from "../controler/HomeControler";
import aboutControler from "../controler/AboutControler";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homeControler.handleHome);
  router.get("/about", aboutControler.handleAbout);
  router.post("/users/create-user", aboutControler.handleCreateUser);
  router.get("/users/list", aboutControler.handleListUsers);
  router.post("/users/delete/:id", aboutControler.handleDeleteUser);

  return app.use("/", router);
};

export default initWebRoutes;
