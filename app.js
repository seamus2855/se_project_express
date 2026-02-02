const express = require("express");
const routes = require("./routes");
const auth = require("./middleware/auth");
const { NOT_FOUND } = require("./utils/errors"); // import your constants

const app = express();

app.use(express.json());

// Temporary authentication middleware (must be before routes)
app.use(auth);

// Main router mounted at root
app.use("/", routes);

// Final 404 handler
app.use((req, res) => {
  res.status(NOT_FOUND).json({ message: "Requested resource not found" });
});

module.exports = app;
