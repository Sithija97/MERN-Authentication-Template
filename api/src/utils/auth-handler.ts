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

const options = {
  httpOnly: true,
  secure: true,
};

export const setCookies = (
  res: Response,
  accessToken?: string,
  refreshToken?: string
) => {
  if (accessToken) res.cookie("accessToken", accessToken, options);
  if (refreshToken) res.cookie("refreshToken", refreshToken, options);
};

export const clearCookies = (
  res: Response,
  tokenName: "accessToken" | "refreshToken"
) => {
  if (tokenName === "accessToken") res.clearCookie("accessToken", options);
  if (tokenName === "refreshToken") res.clearCookie("refreshToken", options);
};

export const generateDecodedToken = async (token: string) => {
  const { error, decode } = await jwt.verify(
    token,
    process.env.JWT_SECRET,
    (error, decode) => {
      return { error, decode };
    }
  );

  return { error, decode };
};
