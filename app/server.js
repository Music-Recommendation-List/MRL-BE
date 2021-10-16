const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
// const csp = require("helmet-csp");
const csp = require("helmet-csp");
const crypto = require("crypto");



const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const commentRouter = require("./routes/comment");

const app = express();
app.use(cors());
// app.use(helmet());
app.use( helmet({ contentSecurityPolicy: false, }) );



// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
// app.set('view engine', 'pug');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "client")));

// 라우터 연결
app.use("/api", postsRouter);
app.use("/api", usersRouter);
app.use("/api", commentRouter);

//지워야할 것
app.use("/", (req, res) => {
  return res.send(express.static(path.join(__dirname, "client/index.html")));
});

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
  res.render("error");
});

module.exports = app;
