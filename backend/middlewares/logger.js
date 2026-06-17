// middleware/logger.js
const winston = require('winston');

// Reusable JSON format for production tracing
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

// 1. Logger dedicated ONLY to recording incoming HTTP requests
const requestLogger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.File({ filename: 'logs/request.log', level: 'info' }),
  ],
});

// 2. Logger dedicated ONLY to tracking application failures
const errorLogger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

// Custom Express middleware wrappers
const requestLogMiddleware = (req, res, next) => {
  requestLogger.info({
    method: req.method,
    url: req.originalUrl || req.url,
    ip: req.ip || (req.socket ? req.socket.remoteAddress : 'unknown'), // FIXED: Replaced deprecated req.connection
    userAgent: req.get('User-Agent') || 'unknown', // Added for better client diagnostic tracing
  });
  next();
};

const errorLogMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Filter out 4xx errors if you only want true operational/system crashes in error.log
  errorLogger.error({
    message: err.message || 'An unexpected error occurred',
    statusCode,
    stack: err.stack,
    url: req.originalUrl || req.url,
    method: req.method,
    isCelebrate: !!err.joi || (err.meta && err.meta.isCelebrate) || false, // Tag validation errors
  });

  next(err); // Pass the error along to centralized errorHandler
};

module.exports = {
  requestLogMiddleware,
  errorLogMiddleware,
};
