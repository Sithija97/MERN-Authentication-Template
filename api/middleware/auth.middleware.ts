import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { NextFunction, Response } from "express";
import { CustomRequest } from "../interfaces/index.js";
import { User } from "../models/index.js";

const protect = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.jwt;
      if (!token) {
        res.status(401);
        throw new Error("No authorized token found, please login");
      }

      const verified: JwtPayload = jwt.verify(
        token,
        process.env.JWT_SECRET
      ) as JwtPayload;

      const user = await User.findById(verified.userId).select("-password");

      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }
  }
);

export { protect };
