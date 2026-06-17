// InternalServerError.ts
import { AppError } from "./apperror";

export class InternalServerError extends AppError {
  public readonly statusCode = 500;
  public readonly errorCode = "INTERNAL_SERVER_ERROR";

  constructor(message = "An unexpected error occurred on the server.") {
    super(message, false); // false marks this as a non-operational software bug
  }
}
