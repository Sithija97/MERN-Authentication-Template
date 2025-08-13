import express, { Request, Response } from "express";
import {
  forgetPasswordController,
  getUserByIdController,
  resetPasswordController,
  signInController,
  signUpController,
  verifyMailController,
} from "../controllers/auth.controller.js";
import { validateSignUp } from "../middleware/validate.midleware.js";
import { authenticatedRoutes } from "../middleware/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.get("/user/:userid", authenticatedRoutes, getUserByIdController);

authRoutes.post("/sign-up", validateSignUp, signUpController);

authRoutes.post("/sign-in", signInController);

authRoutes.post("/mail-verification", verifyMailController);

authRoutes.post("/forget-password", forgetPasswordController);

authRoutes.post(
  "/reset-password",
  authenticatedRoutes,
  resetPasswordController
);

authRoutes.post("/sign-out", (req: Request, res: Response) => {});

export default authRoutes;
