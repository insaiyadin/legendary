import express from "express";
import moviesRouter from "./api/movies";
import { db } from "./database";
import logger from "./middlewares/logger";

const app = express();

app.use(express.json());

app.use(logger);

app.use("/api/movies", moviesRouter);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const statusCode = 500;
    res.status(statusCode).send({
      status: statusCode,
      message: err.message,
    });
  }
);

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
