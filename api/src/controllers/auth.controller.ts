import { setAuthCookies } from "./../utils/cookies";
import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors";
import { createAccount, loginUser } from "../services/auth.service";
import { CREATED, OK } from "../constants/http";
import { loginSchema, registerSchema } from "./auth.schemas";

export const registerHandler = catchErrors(
  async (req: Request, res: Response) => {
    // validate request
    const request = registerSchema.parse({
      ...req.body,
      userAgent: req.headers["user-agent"],
    });

    // call service
    const { user, accessToken, refreshToken } = await createAccount(request);

    // return response
    setAuthCookies({ res, accessToken, refreshToken });
    return res.status(CREATED).json(user);
  }
);

export const loginHandler = catchErrors(async (req: Request, res: Response) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { accessToken, refreshToken } = await loginUser(request);

  setAuthCookies({ res, accessToken, refreshToken });
  return res.status(OK).json({ message: "Login successful" });
});
