import { setAuthCookies } from "./../utils/cookies";
import { request, Request, Response } from "express";
import catchErrors from "../utils/catchErrors";
import { z } from "zod";
import { createAccount } from "../services/auth.service";
import { CREATED } from "../constants/http";

const registerSchema = z
  .object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

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
