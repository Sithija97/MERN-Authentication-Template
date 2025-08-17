import mongoose, { model } from "mongoose";
import { IUser } from "../interfaces/index.js";
import { UserRoles } from "../enums/index.js";

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
  role: {
    type: String,
    enum: Object.values(UserRoles),
    default: UserRoles.USER,
  },
});

const User = model("User", userSchema);
export default User;
