import { validationResult } from "express-validator";
import { BadRequestError } from "../errors/bad-request";
import { NextFunction, Request, Response } from "express";

const validationMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new BadRequestError("Validation Error", errors.array());
    return next(error);
  }
  next();
};

export default validationMiddleware;
