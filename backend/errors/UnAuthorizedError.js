const AppError = require("./AppError");

class UnauthorizedError extends AppError {
  constructor(message = "Authentication is required to access this resource.") {
    super(message);
    this.statusCode = 401;
    this.errorCode = "UNAUTHORIZED";
  }
}

module.exports = UnauthorizedError;
