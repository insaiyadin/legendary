import { app } from "./app";
import { connect } from "./database";
import { createLogFile } from "./helpers/log-file";

async function main() {
  const PORT = 8080;

  try {
    await connect();
  } catch (error) {
    console.log(error);
    console.error("Failed to connect to database");
    console.error(error);
    process.exit(1);
  }

  try {
    createLogFile();
  } catch (error) {
    console.error("Failed to create log file");
    console.error(error);
  }

  console.log("Connected to database");

  app.listen(PORT, () =>
    console.log(`App listening on http://localhost:${PORT}`)
  );
}

main();
