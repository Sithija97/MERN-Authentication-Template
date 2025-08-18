// import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { appConfig } from "./config/app.config.js";
import { conncetDB } from "./config/db.js";

const startServer = async () => {
  const app = express();

  // CORS configuration (example using Express)
  // const corsOptions = {
  //   origin: "http://localhost:5173", // Your frontend URL
  //   credentials: true, // Allow credentials (cookies)
  //   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  //   allowedHeaders: ["Content-Type", "Authorization"],
  // };
  app.use(cors());

  // Handle preflight requests
  app.options("*", cors());

  // database connection
  await conncetDB();
  // App Default Config
  await appConfig(app);
};

startServer();
