const AppError = require("./AppError");

class BadRequestError extends AppError {
  constructor(message = "Invalid data provided.") {
    super(message);
    this.statusCode = 400;
    this.errorCode = "BAD_REQUEST";
  }
}

module.exports = BadRequestError;
