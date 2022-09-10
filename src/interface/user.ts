import mongoose from "mongoose";

export interface UserModel extends mongoose.Document {
  name: string;
  email: string;
  avatar: string;
  avatarId: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  provider: string;
  providerId: string;
  verified: boolean;
}

export interface UserBody {
  name?: string;
  email?: string;
  avatar?: string;
  password?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  provider?: string;
  providerId?: string;
  verified?: boolean;
}
