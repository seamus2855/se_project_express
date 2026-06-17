// UnauthorizedError.ts
import { AppError } from "./apperror";

export class UnauthorizedError extends AppError {
  public readonly statusCode = 401;
  public readonly errorCode = "UNAUTHORIZED";

  constructor(message = "Authentication is required to access this resource.") {
    super(message);
  }
}
