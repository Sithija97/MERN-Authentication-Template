import { Express } from "express";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import { registerRoutes } from "../routes/index.js";
import { errorHandler } from "../middleware/error.middleware.js";

export const appConfig = async (app: Express) => {
  // Load environment variables
  dotenv.config();

  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Routes
  registerRoutes(app);

  app.get("/", (req, res) => {
    res.status(200).send("Hello to the API!");
  });

  // Error handler
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`App Listening on port ${PORT}`);
  });
};
