import { CustomError } from "../classes/custom-error";

export class NotFoundError extends CustomError {
  constructor(message: string = "Not Found") {
    const statusCode = 404;
    super(message, statusCode);
  }
}
