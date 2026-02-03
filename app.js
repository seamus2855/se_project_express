/* eslint-disable no-console */


const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const { NOT_FOUND } = require("./utils/errors");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const app = express();

app.use(express.json());

// Temporary authentication middleware
app.use((req, res, next) => {
  req.user = { _id: "689a9030e7d3d166a6e97f46" };
  next();
});

// Main router
app.use("/", routes);

// Final 404 handler
app.use((req, res) => {
  res.status(NOT_FOUND).json({ message: "Requested resource not found" });
});

module.exports = app;
