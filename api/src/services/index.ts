import {
  createOrUpdateUser,
  fidUserByEmailOrUsername,
} from "./auth.service.js";
import { sendVerificationMail } from "./mail.service.js";

export const AuthService = {
  createOrUpdateUser,
  fidUserByEmailOrUsername,
};

export const MailService = {
  sendVerificationMail,
};
