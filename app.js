const express = require("express");
const routes = require("./routes"); // main router

const app = express();

app.use(express.json());

// Temporary authorization (required for this sprint)
app.use(auth);

// Connect main router at root
app.use("/", routes);

// Final 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Requested resource not found" });
});

module.exports = (req, res, next) => {
  req.user = { _id: "67a0c8f9e4b2f4a1d1234567" }; // hard‑coded test user ID
  next();
};

