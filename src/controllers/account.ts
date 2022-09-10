import { NextFunction, Request, Response } from "express";
import { AppError, HttpCode } from "../exceptions/AppError";
import { catchAsync } from "../exceptions/catchAsync";
import { signToken } from "../utils/sign-token";

class AccountController {
  constructor() {}

  @catchAsync
  async signupHandler(req: Request, res: Response, next: NextFunction) {
    res.status(201).json({
      status: "success",
      message: "signup success",
    });
  }

  @catchAsync
  async loginHandler(req: Request, res: Response, next: NextFunction) {
    return next(new AppError("WOW", HttpCode.NOT_FOUND));

    res.status(201).json({
      status: "success",
      message: "login success",
    });
  }

  @catchAsync
  async googleOauthHandler(req: Request, res: Response) {
    // generate token
    const token = signToken(req.user?._id);

    res.status(HttpCode.OK).json({
      status: "success",
      user: req.user,
      token,
    });
  }

  @catchAsync
  async facebookOauthHandler(req: Request, res: Response) {
    const token = signToken(req.user?._id);

    res.status(HttpCode.OK).json({
      status: "success",
      user: req.user,
      token,
    });
  }
}

export default AccountController;
