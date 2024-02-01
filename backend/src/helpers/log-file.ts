import { writeFile, rm } from "fs/promises";

const logFilePath = process.env.LOG_FILE_NAME as string;

export const createLogFile = async () => {
  await writeFile(logFilePath, "", { flag: "w" });
};

export const deleteLogFile = async () => {
  await rm(logFilePath);
};
