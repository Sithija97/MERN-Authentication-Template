import { generateTokens, setCookies } from "./auth-handler.js";
import { comparePassword, hanshPassword } from "./password-handler.js";
import CustomError from "./error-handler.js";
import { mailSender } from "./mail-handler.js";

export const Utils = {
  passwordHandler: { hanshPassword, comparePassword },
  authHandler: { generateTokens, setCookies },
  mailHandler: { mailSender },
  errorHandler: CustomError,
};
