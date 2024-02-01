import { createTable, db, connect } from ".";

async function migrate() {
  await connect();
  await createTable(db);
}

migrate()
  .then(() => {
    console.log("migration complete");
    process.exit(0);
  })
  .catch((error) => {
    console.error("migration failed");
    console.error(error);
    process.exit(1);
  });
