const AppError = require("./AppError");

class NotFoundError extends AppError {
  constructor(message = "The requested resource could not be found.") {
    super(message);
    this.statusCode = 404;
    this.errorCode = "NOT_FOUND";
  }
}

module.exports = NotFoundError;
