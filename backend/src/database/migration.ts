import { db } from ".";

async function createDAtabase() {
  try {
    await db.query(`
              CREATE TABLE IF NOT EXISTS movies (
                  id SERIAL PRIMARY KEY,
                  title VARCHAR(255) NOT NULL
              );
          `);
  } catch (error) {
    console.error("Failed to create table");
    console.error(error);
    process.exit(1);
  }
}

createDAtabase();
