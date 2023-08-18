import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./public/web";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8081;

// config view engine
configViewEngine(app);

// init web route
initWebRoutes(app);

app.listen(PORT, () => {
    console.log(">>> check app running, ", PORT);
})