import cloudinary from "cloudinary";
import fs from "fs";
import { AppError } from "../exceptions/AppError";

export const uploadToCloudinary = async (
  path: string,
  folder: string = "ChatProject"
) => {
  // path of image we want when it is uploded to cloudinary
  return cloudinary.v2.uploader
    .upload(path, {
      folder: folder,
      transformation: {
        width: 200,
        height: 200,
        crop: "fill",
      },
    })
    .then((result) => {
      // Image has been successfully uploaded on cloudinary
      // So we dont need local image file anymore
      // Remove file from local uploads folder
      fs.unlinkSync(path);

      return {
        url: result.url,
        public_id: result.public_id,
      };
    })
    .catch((error) => {
      // Remove file from local uploads folder
      fs.unlinkSync(path);
      return new AppError("Error while uploading assets to the cloud", 500);
    });
};
