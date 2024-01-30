import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";

const logger = async (req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl } = req;

  const log = `${new Date().toISOString()} - ${method} ${originalUrl}\n`;

  console.log(log);

  fs.writeFile("logs/access.log", log, { flag: "a" });

  next();
};

export default logger;
