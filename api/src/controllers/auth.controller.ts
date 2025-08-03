import { NextFunction, Request, Response } from "express";
import { AuthService, MailService } from "../services/index.js";
import { createOrUpdateUser } from "../services/auth.service.js";
import { Utils } from "../utils/index.js";
import CustomError from "../utils/error-handler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const getUserByIdController = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  // params
  const userId = req.user.userId;
  try {
    const user = await AuthService.findUser({ id: userId });

    if (!user) {
      throw new CustomError("User with Id not found.", 404);
    }

    res.status(200).json({
      message: "User fetch successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Utils.validationHandler.isFieldErrorFree(req, res);
  const { username, email, password } = req.body;

  try {
    const userExists = await AuthService.findUser({ email, username });
    if (userExists) {
      throw new CustomError(
        "User alreay exists with this username or email.",
        400
      );
    }

    // hashing the password
    const hashedPassword = await Utils.passwordHandler.hanshPassword(password);

    const savedUser = await AuthService.createOrUpdateUser({
      username,
      email,
      password: hashedPassword,
    });

    // send verification email
    const verificationOTP = await MailService.sendVerificationMail(savedUser);

    const updatedUser = await createOrUpdateUser(
      { otp: verificationOTP },
      savedUser
    );

    res.status(201).json({
      error: false,
      data: updatedUser,
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
    const user = await AuthService.findUser({
      email,
    });
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

    // updating the refresh token in exisitng user
    const userWithToken = await createOrUpdateUser(
      { refreshToken: refreshToken },
      user
    );

    // set cookies
    Utils.authHandler.setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      error: false,
      data: userWithToken,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!refreshToken) {
    throw new CustomError("Refresh token not found", 401);
  }

  try {
    // verify incoming refresh token & secrt key
    const { error, decode } = await jwt.verify(
      refreshToken,
      process.env.JWT_SECRET,
      (error, decode) => {
        return { error, decode };
      }
    );

    if (Boolean(error)) {
      throw new CustomError("Invalid token", 401);
    }

    // find the user by refresh token
    const user = await User.findById(decode?.data?.id);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    if (user?.refreshToken !== refreshToken) {
      throw new CustomError("Refresh token is not valid", 401);
    }

    // clear existing cookie
    Utils.authHandler.clearCookies(res, "accessToken");

    const { accessToken } = await Utils.authHandler.generateTokens(user);

    Utils.authHandler.setCookies(res, accessToken);

    res.status(200).json({
      accessToken,
      message: "Access token generated successfully",
    });
  } catch (error) {
    next(error);
  }
};
