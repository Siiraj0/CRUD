const express = require("express");
const path = require("path");
const logger = require("morgan");
const userRoute = require("./routes/users");
const adminRoute = require("./routes/admin");
const nocache = require("nocache");
const session = require("express-session");
const mongoose = require("mongoose");
const flash = require("connect-flash");

mongoose.connect("mongodb://127.0.0.1:27017/week6");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "sdsdsd",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRoute);
app.use("/admin", adminRoute);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000, () => {
  console.log("running..");
});
