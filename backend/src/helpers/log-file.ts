import { writeFile, rm } from "fs/promises";

export const createLogFile = async () => {
  const logFilePath = process.env.LOG_FILE_PATH as string;

  await writeFile(logFilePath, "", { flag: "w" });
};

export const deleteLogFile = async () => {
  const logFilePath = process.env.LOG_FILE_PATH as string;

  await rm(logFilePath);
};
