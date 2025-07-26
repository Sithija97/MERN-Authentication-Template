import { generateTokens, setCookies } from "./authentication.js";
import { comparePassword, hanshPassword } from "./password.js";

export const Utils = {
  passwordHandler: { hanshPassword, comparePassword },
  authHandler: { generateTokens, setCookies },
};
