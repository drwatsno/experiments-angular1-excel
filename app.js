const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const webpackMiddleware = require("webpack-dev-middleware");
const index = require("./routes/index");
const users = require("./routes/users");
const docs = require("./routes/docs");
const webpack = require("webpack");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(require("less-middleware")(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));
// webpack
if ("production" !== process.env.NODE_ENV) {
  // run webpack only in development mode
  app.use(webpackMiddleware(webpack(require("./webpack.config")), {
    // publicPath is required, whereas all other options are optional

    noInfo: false,
    // display no info to console (only warnings and errors)

    quiet: false,
    // display nothing to the console

    lazy: false,
    // switch into lazy mode
    // that means no watching, but recompilation on every request

    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    // watch options (only lazy: false)

    publicPath: "/",
    // public path to bind the middleware to
    // use the same as in webpack

    index: "index.html",
    // the index path for web server

    headers: { "X-Custom-Header": "yes" },
    // custom headers

    stats: {
      colors: true
    },
    // options for formating the statistics

    reporter: null,
    // Provide a custom reporter to change the way how logs are shown.

    serverSideRender: false
    // Turn off the server-side rendering mode. See Server-Side Rendering part for more info.
  }));
}
app.use("/", index);
app.use("/users", users);
app.use("/docs", docs);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.json({
    error: err.message
  });
});

module.exports = app;
