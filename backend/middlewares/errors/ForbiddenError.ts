// ForbiddenError.ts
import { AppError } from "./apperror";

export class ForbiddenError extends AppError {
  public readonly statusCode = 403;
  public readonly errorCode = "FORBIDDEN";

  constructor(message = "You do not have permission to perform this action.") {
    super(message);
  }
}
