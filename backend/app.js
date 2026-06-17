const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { errors } = require("celebrate"); // Added Celebrate's built-in automated error handler

// Import custom configurations, routers, and middlewares
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes/index"); 
const { requestLogMiddleware, errorLogMiddleware } = require("./middlewares/logger");

const app = express();
const PORT = 3001;

// ==========================================
// 1. SECURITY & PARSING MIDDLEWARES
// ==========================================
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// 2. WINSTON REQUEST LOGGER
// ==========================================
app.use(requestLogMiddleware);

// ==========================================
// 3. APPLICATION ROUTES
// ==========================================
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Mount the absolute unified router hook
app.use(routes);

// ==========================================
// 4. CENTRAL ERROR LOGGING & HANDLING
// ==========================================
// Step A: Winston error logger captures the raw errors thrown by controllers or Joi
app.use(errorLogMiddleware);

// Step B: Celebrate errors() middleware converts Joi rejections into automated 400 JSON responses
app.use(errors()); // Handles the celebrate validation errors seamlessly

// Step C: Centralized error handling pipeline processes operational backend anomalies
app.use(errorHandler);

// ==========================================
// 5. SERVER INITIALIZATION
// ==========================================
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
