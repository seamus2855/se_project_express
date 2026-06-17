// ConflictError.ts
import { AppError } from "./apperror";

export class ConflictError extends AppError {
  public readonly statusCode = 409;
  public readonly errorCode = "CONFLICT";

  constructor(
    message = "The resource already exists or conflicts with the current state.",
  ) {
    super(message);
  }
}
