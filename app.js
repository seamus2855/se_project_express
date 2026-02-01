const express = require("express");
const auth = require("./middleware/auth");
const itemsRouter = require("./routes/clothingitems");

const app = express();

app.use(express.json());

// ⬅️ Mount temporary auth BEFORE routes
app.use(auth);

// Items routes
app.use("/items", itemsRouter);

// Catch‑all 404
app.use((req, res) => {
  res.status(404).json({ message: "Requested resource not found" });
});

module.exports = app;
