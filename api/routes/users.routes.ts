import express from "express";
import {
  changePassword,
  forgetPassword,
  getLoggedInStatus,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  loginWithGoogle,
  updateUser,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/index.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.post("/google-login", loginWithGoogle);
userRouter.get("/getUser", protect, getUser);
userRouter.get("/loggedin", getLoggedInStatus);
userRouter.patch("/updateuser", protect, updateUser);
userRouter.patch("/changepassword", protect, changePassword);
userRouter.post("/forgetpassword", protect, forgetPassword);
userRouter.put("/resetpassword/:resetToken", resetPassword);

export { userRouter };
