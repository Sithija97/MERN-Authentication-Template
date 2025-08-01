import { generateTokens, setCookies } from "./auth-handler.js";
import { comparePassword, hanshPassword } from "./password-handler.js";
import CustomError from "./error-handler.js";
import { mailSender } from "./mail-handler.js";
import { isFieldErrorFree } from "./validation-handler.js";
import { generateOTP } from "./otp-handler.js";

export const Utils = {
  passwordHandler: { hanshPassword, comparePassword },
  authHandler: { generateTokens, setCookies },
  mailHandler: { mailSender },
  validationHandler: { isFieldErrorFree },
  otpHandler: { generateOTP },
  errorHandler: CustomError,
};
