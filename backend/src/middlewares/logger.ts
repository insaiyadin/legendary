import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl } = req;

  const originalSend = res.send;

  res.send = function (body) {
    const status = res.statusCode;
    const log = `${new Date().toISOString()} - ${method} ${originalUrl} - ${status}\r`;

    console.log(log);

    fs.writeFile("logs/access.log", log, { flag: "a" });

    res.send = originalSend;

    return originalSend.call(res, body);
  };

  next();
};

export default loggerMiddleware;
