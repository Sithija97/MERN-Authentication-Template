import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/index.js";
import { Response } from "express";

export const generateTokens = async (user: IUser) => {
  const accessToken = await jwt.sign(
    { data: { email: user?.email, id: user._id } },
    process.env.JWT_SECRET!,
    { expiresIn: 60 * 60 } // 1 hour
  );

  const refreshToken = await jwt.sign(
    { data: { email: user?.email, id: user._id } },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};

export const setCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
  });
};
