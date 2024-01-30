import express, { json, Request, Response, NextFunction } from "express";
import moviesRouter from "./api/movies";
import { db } from "./database";
import logger from "./middlewares/logger";
import { CustomError } from "./classes/custom-error";
import cors from "cors";

const app = express();

app.use(cors());

app.use(json());

app.use(logger);

app.use("/api/movies", moviesRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const errorMessage = `Cannot ${req.method} ${req.path}`;
  const error = new CustomError(errorMessage, 404);
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
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

async function main() {
  const PORT = 8080;

  try {
    await db.connect();
  } catch (error) {
    console.error("Failed to connect to database");
    console.error(error);
    process.exit(1);
  }

  console.log("Connected to database");

  app.listen(PORT, () =>
    console.log(`App listening on http://localhost:${PORT}`)
  );
}

main();
