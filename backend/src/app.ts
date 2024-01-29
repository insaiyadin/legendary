import express from "express";
import moviesRouter from "./api/movies";

const app = express();

app.use(express.json());

app.use("/api/movies", moviesRouter);

async function main() {
  const PORT = 8080;

  app.listen(PORT, () =>
    console.log(`App listening on http://localhost:${PORT}`)
  );
}

main();
