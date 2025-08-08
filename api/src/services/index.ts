import { createOrUpdateUser, findUser } from "./auth.service.js";
import {
  sendForgetPasswordLink,
  sendVerificationMail,
} from "./mail.service.js";

export const AuthService = {
  createOrUpdateUser,
  findUser,
};

export const MailService = {
  sendVerificationMail,
  sendForgetPasswordLink,
};
