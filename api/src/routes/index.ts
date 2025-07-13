import authRoutes from "./auth.route.js";
import { Express } from "express";

export function registerRoutes(app: Express) {
  app.use("/api/auth", authRoutes);
}
