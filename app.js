const express = require("express");
const routes = require("./routes"); // main router

const app = express();

app.use(express.json());

// Mount all routes
app.use("/", routes);

module.exports = app;
