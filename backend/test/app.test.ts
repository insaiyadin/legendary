import { connect, createTable, db } from "../src/database";
import { createLogFile, deleteLogFile } from "../src/helpers/log-file";
import { createDb, destroyDb } from "./helpers/database";

jest.setTimeout(155000);

beforeAll(async () => {
  try {
    await deleteLogFile();
  } catch (error) {
    console.error(error);
  }
  await createLogFile();

  await createDb();

  await connect();

  await createTable(db);
});

afterAll(async () => {
  await destroyDb();
});

it("should check db", async () => {
  expect(db).toBeDefined();
});

require("./movies");
require("./middleware");
