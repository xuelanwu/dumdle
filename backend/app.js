const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const { createServer } = require("http");
const { Server } = require("socket.io");

const { environment } = require("./config");
const isProduction = environment === "production";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

let users = {};
io.on("connection", (socket) => {
  socket.on("login", (dogId) => {
    users[dogId] = socket.id;
    socket.emit("online", dogId);
    // console.log("-------------------- login socket id", socket.id);
    // console.log("-------------------- login dogId", dogId);
  });
  socket.on("message", (message) => {
    // console.log("-------------------- message msg", message);
    // console.log(
    //   "-------------------- message recipientId",
    //   message.recipientId
    // );
    const recipient = users[message.recipientId];
    // console.log("------------------- message recipient", recipient);
    if (recipient) socket.to(recipient).emit("message", message);
  });
});

app.use(morgan("dev"));

app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

const routes = require("./routes");
app.use(routes); // Connect all the routes

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

const { ValidationError } = require("sequelize");

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = "Validation error";
  }
  next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = { app, httpServer };
