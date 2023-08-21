import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import testConnection from "./config/connectDB";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8081;

// CORS middleware
configCors(app);

// config view engine
configViewEngine(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test connect to DB
testConnection();

// init web route
initWebRoutes(app);
// init api route
initApiRoutes(app);

app.listen(PORT, () => {
  console.log(">>> check app running on port: ", PORT);
});
