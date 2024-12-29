import { Router } from "express";
import { registerHandler, loginHandler } from "../controllers/auth.controller";

const authRoutes = Router();

// prefix: /auth
authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);

export default authRoutes;
