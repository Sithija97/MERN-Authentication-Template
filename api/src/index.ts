import express, { Request, Response } from "express";
import cors from "cors";
import { APP_ORIGIN, PORT } from "./constants/env";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import catchErrors from "./utils/catchErrors";
import authRoutes from "./routes/auth.route";
import { OK } from "./constants/http";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  throw new Error("Test error");
  res.status(OK).json({ status: "healthy" });
});

app.use("/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port : ${PORT}`);
  await connectDB();
});
