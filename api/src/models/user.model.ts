import mongoose, { model } from "mongoose";
import { IUser } from "../interfaces/index.js";

const { Schema } = mongoose;

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  otp: {
    type: Number,
    min: 100000,
    max: 999999,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
});

const User = model("User", userSchema);
export default User;
