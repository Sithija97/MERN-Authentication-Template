import { NextFunction, Response } from "express";
import CustomError from "../utils/error-handler.js";
import { Utils } from "../utils/index.js";
import { CustomRequest } from "../interfaces/index.js";

export const authenticatedRoutes = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string;

    if (req.path.startsWith("/reset-password")) {
      token = req.header("Authorization")?.replace("Bearer ", "");
    } else {
      token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
    }

    if (!token) {
      throw new CustomError("Token not fond", 401);
    }

    // verify incoming refresh token
    const { error, decode } = await Utils.authHandler.generateDecodedToken(
      token
    );

    if (error) {
      throw new CustomError("Token is invalid or expired", 401);
    }

    req.user = decode.data;

    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this resource" });
    }
    next();
  };
};
