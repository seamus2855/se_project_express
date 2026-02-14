const express = require("express");
const auth = require("./middlewares/auth");
const { login, createUser } = require("./controllers/users");
const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/items");

const app = express();

app.use(express.json());

// Public routes
app.post("/signin", login);
app.post("/signup", createUser);
app.get("/items", itemRoutes); // GET /items is public

// Apply auth to everything below
app.use(auth);

// Protected routes
app.use("/users", userRoutes);
app.use("/items", itemRoutes); // all other item routes are protected

module.exports = app;
