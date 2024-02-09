import { writeFile, rm } from "fs/promises";
import { existsSync, mkdirSync } from "fs";

const logsFileDir = "logs";

const logFilePath = process.env.LOG_FILE_NAME as string;

export const createLogFile = async () => {
  if (!existsSync(logsFileDir)) {
    mkdirSync(logsFileDir);
  }
  await writeFile(logFilePath, "", { flag: "w" });
};

export const deleteLogFile = async () => {
  if (!existsSync(logsFileDir)) {
    return;
  }
  await rm(logFilePath);
};
