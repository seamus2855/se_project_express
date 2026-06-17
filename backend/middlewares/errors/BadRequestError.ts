// BadRequestError.ts
import { AppError } from "./apperror";

export class BadRequestError extends AppError {
  public readonly statusCode = 400;
  public readonly errorCode = "BAD_REQUEST";

  constructor(message = "Invalid request parameters.") {
    super(message);
  }
}
