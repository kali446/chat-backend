import { NextFunction, Request, Response } from "express";
import { AppError, HttpCode } from "../exceptions/AppError";
import { catchAsync } from "../exceptions/catchAsync";
import { uploadToCloudinary } from "../utils/cloudinary";

class FileController {
  constructor() {}

  @catchAsync
  async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    if (req.method === "POST") {
      const file = req.file;

      const avatarResponse = await uploadToCloudinary(file?.path!);

      res.status(HttpCode.NEW_CONTENT).json({
        status: "success",
        data: avatarResponse,
      });
    } else {
      return next(
        new AppError(`${req.method} method not allowed`, HttpCode.NOT_ALLOWED)
      );
    }
  }
}

export default FileController;
