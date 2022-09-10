import { Request, Response, NextFunction } from "express";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err };

  console.log(error, 'from error controller');

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
