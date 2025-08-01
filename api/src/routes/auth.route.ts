import express, { Request, Response } from "express";
import {
  signInController,
  signUpController,
} from "../controllers/auth.controller.js";
import { validateSignUp } from "../middleware/validate.midleware.js";

const authRoutes = express.Router();

authRoutes.get("/users", (req: Request, res: Response) => {});

authRoutes.post("/sign-up", validateSignUp, signUpController);

authRoutes.post("/sign-in", signInController);

authRoutes.post("/sign-out", (req: Request, res: Response) => {});

export default authRoutes;
