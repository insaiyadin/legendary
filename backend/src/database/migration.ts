import { db } from ".";

async function createDAtabase() {
  try {
    console.log("Creating tables...");
    await db.query(`
              CREATE TABLE IF NOT EXISTS movies (
                  id SERIAL PRIMARY KEY,
                  title VARCHAR(255) NOT NULL UNIQUE
              );
          `);
  } catch (error) {
    console.error("Failed to create table");
    console.error(error);
    process.exit(1);
  }
}

createDAtabase();
