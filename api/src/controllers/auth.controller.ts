import { Request, Response } from "express";
import User from "../models/user.model.js";
import { AuthService } from "../services/index.js";
import { Utils } from "../utils/index.js";
import jwt from "jsonwebtoken";

export const signUpController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await AuthService.fidUserByEmailOrUsername(
      email,
      username
    );
    if (userExists) {
      return res.status(401).json({
        error: true,
        message: "User alreay exists with this username or email.",
      });
    }

    // hashing the password
    const hashedPassword = await Utils.passwordHandler.hanshPassword(password);

    const user = new User({ username, email, password: hashedPassword });
    const savedUser = await user.save();

    res.status(201).json({
      error: false,
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
      details: error instanceof Error ? error.message : error,
    });
  }
};

export const signInController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await AuthService.fidUserByEmailOrUsername(email, password);
    if (!user) {
      return res.status(401).json({
        error: true,
        message: "Username or email does not exist.",
      });
    }

    // check the password
    const corretPassword = await Utils.passwordHandler.comparePassword(
      password,
      user.password
    );
    if (!corretPassword) {
      return res.status(401).json({
        error: true,
        message: "Password does not match",
      });
    }

    const { accessToken, refreshToken } =
      await Utils.authHandler.generateTokens(user);

    user.refreshToken = refreshToken;
    await user.save();

    // set cookies
    Utils.authHandler.setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      error: false,
      data: user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
      details: error instanceof Error ? error.message : error,
    });
  }
};
