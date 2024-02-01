import express, { json, Request, Response, NextFunction } from "express";
import moviesRouter from "./api/movies";
import { connect, db } from "./database";
import logger from "./middlewares/logger";
import { CustomError } from "./classes/custom-error";
// import cors from "cors";

export const app = express();

// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//   })
// );

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "POST,GET,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(json());

app.use(logger);

app.use("/api/movies", moviesRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const errorMessage = `Cannot ${req.method} ${req.path}`;
  const error = new CustomError(errorMessage, 404);
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  if (error instanceof CustomError) {
    return res.status(error.statusCode).send({
      status: error.statusCode,
      message: error.message,
    });
  }

  const statusCode = 500;

  res.status(statusCode).send({
    status: statusCode,
    message: "Internal Server Error",
  });
});
