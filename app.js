const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const morgan = require("morgan");
const csrfProtection = csrf({ cookie: true });
const session = require("express-session");

const { HairColor, Person } = require("./models");

//async error handler
const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

//middleware goes here
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//set the view engine to pug
app.set("view engine", "pug");
//routes go here

const port = 8081;
app.listen(port, () => console.log(`Listening on port ${port}...`));
