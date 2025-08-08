import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { registerRoutes } from "./routes/index.js";
import { conncetDB } from "./config/db.js";
import { errorHandler } from "./middleware/index.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
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

// Connect to MongoDB
conncetDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
