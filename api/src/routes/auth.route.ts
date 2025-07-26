import express, { Request, Response } from "express";
import {
  signInController,
  signUpController,
} from "../controllers/auth.controller.js";
const authRoutes = express.Router();

authRoutes.get("/users", (req: Request, res: Response) => {});

authRoutes.post("/sign-up", signUpController);

authRoutes.post("/sign-in", signInController);

authRoutes.post("/sign-out", (req: Request, res: Response) => {});

export default authRoutes;
