const winston = require("winston");
const expressWinston = require("express-winston");

// Reusable JSON format for production tracing
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

// 1. Logger dedicated ONLY to recording incoming HTTP requests
const requestLogMiddleware = expressWinston.logger({
  transports: [
    new winston.transports.File({ 
      filename: "logs/request.log", 
      level: "info" 
    }),
  ],
  format: logFormat,
});

// 2. Logger dedicated ONLY to tracking application failures
const errorLogMiddleware = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ 
      filename: "logs/error.log", 
      level: "error" 
    }),
  ],
  format: logFormat,
});

module.exports = {
  requestLogMiddleware,
  errorLogMiddleware,
};
