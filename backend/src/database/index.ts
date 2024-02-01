import pg from "pg-promise";

let db: pg.IConnected<any, any>;

const connect = async () => {
  const DB_USER = process.env.DB_USER;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const DB_HOST = process.env.DB_HOST;
  const DB_PORT = process.env.DB_PORT;
  const DB_NAME = process.env.DB_NAME;

  const connectionString = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

  const dbInstance = pg()(connectionString);

  const client = await dbInstance.connect();

  db = client;
};

async function createTable(client: pg.IConnected<any, any>) {
  try {
    await client.query(`
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

export { db, connect, createTable };
