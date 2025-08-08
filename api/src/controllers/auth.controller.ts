import { NextFunction, Request, Response } from "express";
import { AuthService, MailService } from "../services/index.js";
import { createOrUpdateUser, findUser } from "../services/auth.service.js";
import { Utils } from "../utils/index.js";
import CustomError from "../utils/error-handler.js";
import User from "../models/user.model.js";
import { CustomRequest } from "../interfaces/index.js";

export const getUserByIdController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // params
  const userId = req.user.id;
  try {
    const user = await AuthService.findUser({ id: userId }, [
      "-password",
      "-refreshToken",
      "-otp",
      "-__v",
    ]);

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

    res.status(200).json({
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
    const { error, decode } = await Utils.authHandler.generateDecodedToken(
      refreshToken
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

export const verifyMailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // await Utils.validationHandler.isFieldErrorFree(req, res);
  const { otp, userId } = req.body;

  try {
    const user = await findUser({ id: userId });

    if (!user) {
      throw new CustomError("User with this Id not found!", 401);
    }

    if (user.otp !== otp) {
      throw new CustomError("OTP does not match", 401);
    }

    const response = await createOrUpdateUser({ email_verified: true }, user);
    res.status(200).json({ response, message: "Email verified successfully" });
  } catch (error) {
    next(error);
  }
};

export const forgetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const user = await AuthService.findUser({
      email,
    });
    if (!user) {
      throw new CustomError("Username or email does not exist.", 401);
    }

    // send email with reset password link
    const accessToken = await MailService.sendForgetPasswordLink(user);

    res.status(200).json({
      error: false,
      message: "Reset passowrd link has been sent",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
