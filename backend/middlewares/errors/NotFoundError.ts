// NotFoundError.ts
import { AppError } from "./apperror";

export class NotFoundError extends AppError {
  public readonly statusCode = 404;
  public readonly errorCode = "NOT_FOUND";

  constructor(resource = "Resource") {
    super(`${resource} could not be found.`);
  }
}
