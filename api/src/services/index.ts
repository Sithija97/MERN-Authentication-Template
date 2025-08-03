import { createOrUpdateUser, findUser } from "./auth.service.js";
import { sendVerificationMail } from "./mail.service.js";

export const AuthService = {
  createOrUpdateUser,
  findUser,
};

export const MailService = {
  sendVerificationMail,
};
