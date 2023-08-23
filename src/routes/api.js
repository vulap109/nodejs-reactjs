import express from "express";
import authControler from "../controler/AuthControler";
import userControler from "../controler/UserControler";
import { checkUserJWT } from "../middleWare/JWTAction";

const router = express.Router();

const initApiRoutes = (app) => {
  // test API
  router.get("/test", checkUserJWT, authControler.testAPI);

  router.post("/register", authControler.regesterAPI);

  router.post("/login", authControler.loginAPI);

  router.get("/user/get-user-list", userControler.getUsersList);

  return app.use("/api/", router);
};

// const checkIsLoggedIn = (req, res, next) => {
//   const noneSecurePaths = ["/", "/login"];
// };

export default initApiRoutes;
