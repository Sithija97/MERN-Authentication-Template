import { NextFunction, Request, Response } from "express";
import User from "../models/user.model.js";
import { AuthService } from "../services/index.js";
import { Utils } from "../utils/index.js";
import CustomError from "../utils/error-handler.js";

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await AuthService.fidUserByEmailOrUsername(
      email,
      username
    );
    if (userExists) {
      throw new CustomError(
        "User alreay exists with this username or email.",
        400
      );
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
    next(error);
  }
};

export const signInController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await AuthService.fidUserByEmailOrUsername(email, password);
    if (!user) {
      throw new CustomError("Username or email does not exist.", 401);
    }

    // check the password
    const corretPassword = await Utils.passwordHandler.comparePassword(
      password,
      user.password
    );
    if (!corretPassword) {
      throw new CustomError("Password does not match.", 401);
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
    next(error);
  }
};
