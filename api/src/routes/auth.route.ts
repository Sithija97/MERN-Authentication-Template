import express, { Request, Response } from "express";
import {
  forgetPasswordController,
  getUserByIdController,
  logOutController,
  resetPasswordController,
  signInController,
  signUpController,
  verifyMailController,
  getAllUsersController,
} from "../controllers/auth.controller.js";
import { validateSignUp } from "../middleware/validate.midleware.js";
import {
  authenticatedRoutes,
  authorizeRoles,
} from "../middleware/auth.middleware.js";
import { UserRoles } from "../enums/index.js";

const authRoutes = express.Router();

authRoutes.get("/user", authenticatedRoutes, getUserByIdController);

authRoutes.get(
  "/users",
  authenticatedRoutes,
  authorizeRoles(UserRoles.ADMIN),
  getAllUsersController
);

authRoutes.post("/sign-up", validateSignUp, signUpController);

authRoutes.post("/sign-in", signInController);

authRoutes.post("/mail-verification", verifyMailController);

authRoutes.post("/forget-password", forgetPasswordController);

authRoutes.post(
  "/reset-password",
  authenticatedRoutes,
  resetPasswordController
);

authRoutes.post("/sign-out", authenticatedRoutes, logOutController);

export default authRoutes;
