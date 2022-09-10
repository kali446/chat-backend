import { Router } from "express";
import FileController from "../controllers/file";
import upload from "../utils/multer";

class FileRouter {
  private fileRouter;
  private fileController;

  constructor() {
    this.fileRouter = Router();
    this.fileController = new FileController();
  }

  init() {
    this.fileRouter.post(
      "/",
      upload.single("avatar"),
      this.fileController.uploadAvatar
    );

    return this.fileRouter;
  }
}

export default FileRouter;
