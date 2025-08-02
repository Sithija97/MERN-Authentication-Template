import {
  createOrUpdateUser,
  findUserByEmailOrUsername,
} from "./auth.service.js";
import { sendVerificationMail } from "./mail.service.js";

export const AuthService = {
  createOrUpdateUser,
  findUserByEmailOrUsername,
};

export const MailService = {
  sendVerificationMail,
};
