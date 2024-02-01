import { connect, createTable, db } from "../src/database";
import { createDb, destroyDb } from "./helpers/database";

jest.setTimeout(155000);

beforeAll(async () => {
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
