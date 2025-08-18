import { createOrUpdateUser, findUsers, findUser } from "./auth.service.js";
import {
  sendForgetPasswordLink,
  sendVerificationMail,
} from "./mail.service.js";

export const AuthService = {
  createOrUpdateUser,
  findUsers,
  findUser,
};

export const MailService = {
  sendVerificationMail,
  sendForgetPasswordLink,
};
