import mongoose from "mongoose";
import { UserModel } from "../interface/user";

const userSchema = new mongoose.Schema<UserModel>({
  name: String,
  email: String,
  avatar: String,
  avatarId: String,
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  provider: String,
  providerId: String,
  verified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model<UserModel>("User", userSchema);

export default User;
