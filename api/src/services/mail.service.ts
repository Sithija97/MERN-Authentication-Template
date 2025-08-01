import { IUser } from "../interfaces/index.js";
import { Utils } from "../utils/index.js";

export const sendVerificationMail = async (user: IUser) => {
  const verificationLink = `${process.env.FRONTEND_URL}/verify-otp?userid=${user._id}`;
  const verificatonOtp = await Utils.otpHandler.generateOTP();

  // compose the verification email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user?.email,
    subject: "Verify Your Email - Welcome to Our Authentication Service",
    text: `Hello ${user?.username},

      Thank you for signing up with us!

      To complete your registration, please verify your email address using the OTP: ${verificatonOtp}, or click the link below:
      ${verificationLink}

      If you did not initiate this registration, please disregard this email.

      Best regards,
      Your Service Team`,
    html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Verify Your Email</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
              <h5 style="color: #333;">Welcome to Our Authentication Service</h5>
              <p style="font-size: 16px; color: #555;">Hello <strong>${
                user?.username ?? "User"
              }</strong>,</p>
              <p style="font-size: 16px; color: #555;">Thank you for signing up with us!</p>
              <p style="font-size: 16px; color: #555;">Please verify your email address using the OTP below:</p>
              <p style="font-size: 16px; font-weight: bold; color: #007bff;">${verificatonOtp}</p>
              <p style="font-size: 16px; color: #555;">Or click the button below to complete your verification:</p>
              <p style="text-align: center;">
                <a href="${verificationLink}"  target="_blank" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px; margin: 12px 0">
                  Verify Email
                </a>
              </p>
              <p style="font-size: 14px; color: #999;">If you did not sign up for this account, you can safely ignore this email.</p>
              <p style="font-size: 14px; color: #999;">Best regards,<br>Your Service Team</p>
            </div>
          </body>
        </html>
        `,
  };

  await Utils.mailHandler.mailSender.sendMail(mailOptions);
  return verificatonOtp;
};
