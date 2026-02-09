/* eslint-disable no-console */

const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const { NOT_FOUND } = require("./utils/errors");
const { login, createUser } = require("./controllers/users");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const app = express();
const PORT = 3001;

app.use(express.json());

// Public auth routes
app.post("/signin", login);
app.post("/signup", createUser);

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
