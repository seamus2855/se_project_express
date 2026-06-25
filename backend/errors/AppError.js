class AppError extends Error {
  constructor(message, isOperational = true) {
    if (new.target === AppError) {
      throw new TypeError("Cannot instantiate abstract class AppError directly");
    }

    super(message);

    this.isOperational = isOperational;
    this.name = this.constructor.name;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);

    if (this.statusCode === undefined) {
      throw new Error("Property 'statusCode' must be implemented in subclass");
    }
    if (this.errorCode === undefined) {
      throw new Error("Property 'errorCode' must be implemented in subclass");
    }
  }
}

module.exports = AppError;
