import { GenericContainer, StartedTestContainer, Wait } from "testcontainers";

let postgres: StartedTestContainer;
let appInstance: Express.Application;

export const createDb = async () => {
  postgres = await new GenericContainer("postgres:16")
    .withEnvironment({
      POSTGRES_USER: process.env.DB_USER as string,
      POSTGRES_PASSWORD: process.env.DB_PASSWORD as string,
      POSTGRES_DB: process.env.DB_NAME as string,
    })
    .withExposedPorts(5432)
    .withWaitStrategy(Wait.forListeningPorts())
    .start();

  process.env.DB_PORT = postgres.getMappedPort(5432).toString();

  return appInstance;
};

export const destroyDb = async () => {
  await postgres.stop();
};
