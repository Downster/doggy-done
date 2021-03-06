const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { sequelize } = require("./db/models");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const listsRouter = require("./routes/lists");
const dogsRouter = require('./routes/dogs');
const notesRouter = require('./routes/notes');
const tasksRouter = require('./routes/tasks');
const appRouter = require('./routes/app');
const breedsRouter = require('./routes/breeds')
const {requireAuth, restoreUser} = require('./auth');
const dogNames = require("dog-names");
const app = express();

// view engine setup
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret: "superSecret",
    store,
    saveUninitialized: false,
    resave: false,
  })
);

// create Session table if it doesn't already exist
store.sync();

//routes go here
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(restoreUser);

// seriously don't ask
app.get('/randomDogNames/:type(m|f)', (req, res, next) => {
  const { type } = req.params;
  const data = type === "f" ? dogNames.female : dogNames.male;
  return res.json(data);
});

app.use(requireAuth);
app.use("/lists", listsRouter);
app.use("/dogs", dogsRouter);
app.use("/notes", notesRouter);
app.use('/tasks', tasksRouter);
app.use('/app', appRouter);
app.use('/breeds', breedsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err.message);
  console.log(err.trace);
  res.render("error");
});

module.exports = app;
