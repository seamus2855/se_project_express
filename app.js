/* eslint-disable no-console */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount all routes
app.use("/", routes);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

module.exports = app;
