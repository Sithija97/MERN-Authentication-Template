import { IUser } from "../interfaces/index.js";
import { Utils } from "../utils/index.js";

export const sendVerificationMail = async (user: IUser) => {
  const verificatonOtp = await Utils.otpHandler.generateOTP();
  const verificationLink = `${process.env.FRONTEND_URL}/verify-otp?userid=${user._id}`;

  // compose the verification email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user?.email,
    subject: "Welcome to the Auth App",
    html: `<p>welcome, your account has been created with email: ${user?.email}<p><b>please verify the email using the OTP ${verificatonOtp} by clicking this</b><a href="${verificationLink}">&nbsp;verify</a>`,
  };

  await Utils.mailHandler.mailSender.sendMail(mailOptions);
  return verificatonOtp;
};

export const sendForgetPasswordLink = async (user: IUser) => {
  const { accessToken } = await Utils.authHandler.generateTokens(user);
  const resetPasswordLink = `${process.env.FRONTEND_URL}/reset-password?token=${accessToken}`;

  // compose the reset password email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user?.email,
    subject: "Reset Password",
    html: `<p>welcome, ${user?.email}<p><b>please reset password with this link by clicking this</b><a href="${resetPasswordLink}">&nbsp;Reset Password</a>`,
  };

  await Utils.mailHandler.mailSender.sendMail(mailOptions);
  return accessToken;
};
