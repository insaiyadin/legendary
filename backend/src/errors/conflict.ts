import { CustomError } from "../classes/custom-error";

export class ConflictError extends CustomError {
  constructor(message: string = "Conflict") {
    const statusCode = 409;
    super(message, statusCode);
  }
}
