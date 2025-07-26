import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { registerRoutes } from "./routes/index.js";
import { conncetDB } from "./config/db.js";
import { errorHandler } from "./middleware/error.middleware.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
