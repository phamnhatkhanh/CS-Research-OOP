const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
dotenv.config({ path: "./config.env" });
const app = express();
const http = require("http");
const AppError = require("./utils/app_error");
const errorController = require("./controllers/error_controller");
const phanLoaiRouters = require("./routers/phanloai_routers");
const chuongHocRouters = require("./routers/chuonghoc_routers");
const phanMucRouters = require("./routers/phanmuc_routers");
const baiHocRouters = require("./routers/baihoc_routers");
const searchRouters = require("./routers/search_routers");
const cors = require("cors");
//MIDDLEWARE
app.use(cors());
app.options(process.env.ENDPOINT_CLIENT, cors());
//security http
app.use(helmet());

//development logging
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

//limit request
const limiter = rateLimit({
  max: 100,
  window: 60 * 60 * 1000,
  message: "Too many requests from this ip, please try again 1 hour later",
});
app.use("/api", limiter);

///// body parser in , reading data from body
app.use(express.json({ limit: "50mb" }));

//against NoSQL Injection
app.use(mongoSanitize());

//against XSS (HTML, JS)

//app.use(xss());

//serving static file
app.use(express.static(`${__dirname}/public`));

//test middleware
app.use((req, res, next) => {
  req.timeNow = new Date().toISOString();
  next();
});

//routers
app.get("/", (req, res) => {
  res.status(200).send("404 Not Found");
});
app.use("/api/v1/search", searchRouters);
app.use("/api/v1/phanloai", phanLoaiRouters);
app.use("/api/v1/chuonghoc", chuongHocRouters);
app.use("/api/v1/phanmuc", phanMucRouters);
app.use("/api/v1/baihoc", baiHocRouters);

app.all("*", (req, res, next) => {
  next(new AppError(`No found ${req.originalUrl}`, 404));
});

app.use(errorController);
module.exports = app;
