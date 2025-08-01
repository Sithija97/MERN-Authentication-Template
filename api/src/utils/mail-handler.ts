import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.SMTP_USER);
console.log(process.env.SMTP_PASSWORD);

export const mailSender = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASSWORD!,
  },
});
