const AppError = require("./AppError");

class ConflictError extends AppError {
  constructor(message = "A conflict occurred with the current state of the resource.") {
    super(message);
    this.statusCode = 409;
    this.errorCode = "CONFLICT";
  }
}

module.exports = ConflictError;
