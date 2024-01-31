import { ErrorFormatter } from "express-validator";
import { CustomError } from "../classes/custom-error";

export class BadRequestError extends CustomError {
  constructor(message: string = "Bad Request", errors: any[] = []) {
    let errorMessage = message;

    const firstError = errors[0];

    if (firstError && firstError.msg) {
      errorMessage = firstError.msg;
    }

    super(errorMessage, 400);
  }
}
