import express from "express";
import apiControler from "../controler/ApiControler";

const router = express.Router();

const initApiRoutes = (app) => {
  // test API
  router.get("/test", apiControler.testAPI);

  router.post("/register", apiControler.regesterAPI);

  return app.use("/api/", router);
};

export default initApiRoutes;
