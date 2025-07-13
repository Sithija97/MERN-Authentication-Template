import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  usernamee: {
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
    type: String,
    max: 6,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
});

const User = model("User", userSchema);
export default User;
