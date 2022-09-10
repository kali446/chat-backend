import { Router, Request, Response, NextFunction } from "express";
import { AppError, HttpCode } from "../exceptions/AppError";
import AccountRouter from "./account";
import FileRouter from "./file";

const ROUTES = Router();

// routes
ROUTES.use("/api/v1/account/", new AccountRouter().init());
ROUTES.use("/api/v1/file", new FileRouter().init());
ROUTES.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(
    new AppError(
      `Can't find ${req.originalUrl} on this server`,
      HttpCode.NOT_FOUND
    )
  );
});

export default ROUTES;
