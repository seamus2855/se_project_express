const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { errors } = require("celebrate");

const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes/index");
const { requestLogMiddleware, errorLogMiddleware } = require("./middlewares/logger");

const app = express();
const PORT = 3001;

// ==========================================
// 1. WINSTON REQUEST LOGGER (MUST BE FIRST)
// ==========================================
app.use(requestLogMiddleware); 

// ==========================================
// 2. SECURITY & PARSING MIDDLEWARES
// ==========================================
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// 3. APPLICATION ROUTES
// ==========================================
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(routes);

// ==========================================
// 4. CENTRAL ERROR LOGGING & HANDLING
// ==========================================
// Step A: Winston error logger (MUST BE BEFORE CELEBRATE & CENTRAL HANDLER)
app.use(errorLogMiddleware); 

// Step B: Celebrate validation error formatter
app.use(errors()); 

// Step C: Centralized error handler
app.use(errorHandler); 

// ==========================================
// 5. SERVER INITIALIZATION
// ==========================================
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
