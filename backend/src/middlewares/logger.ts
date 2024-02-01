import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl } = req;

  const originalSend = res.send;

  res.send = function (body) {
    const status = res.statusCode;
    const log = `${new Date().toISOString()} - ${method} ${originalUrl} - ${status}\r`;

    console.log(log);

    const logFilePath = process.env.LOG_FILE_PATH as string;

    try {
      fs.writeFile(logFilePath, log, { flag: "a" });
    } catch (error) {
      console.error(error);
    }

    res.send = originalSend;

    return originalSend.call(res, body);
  };

  next();
};

export default loggerMiddleware;
