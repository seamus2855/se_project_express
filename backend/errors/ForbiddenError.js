const AppError = require("./AppError");

class ForbiddenError extends AppError {
  constructor(message = "You do not have permission to perform this action.") {
    super(message);
    this.statusCode = 403;
    this.errorCode = "FORBIDDEN";
  }
}

module.exports = ForbiddenError;
