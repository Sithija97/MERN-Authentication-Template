import {
  ForgetPassword,
  PageNotFound,
  ResetPassword,
  SignIn,
  SignUp,
  VerifyOTP,
} from "@/pages";
import { AuthLayout, Layout } from "@/pages/layouts";
import { createBrowserRouter } from "react-router-dom";

export const ROOT = "/";
export const SIGN_IN = "/sign-in";
export const SIGN_UP = "/sign-up";
export const FORGOT_PASSWORD = "/forgot-password";
export const RESET_PASSWORD = "/reset-password";
export const VERIFY_OTP = "/verify-otp";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <p>Hello</p>,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: SIGN_IN,
        element: <SignIn />,
      },
      {
        path: SIGN_UP,
        element: <SignUp />,
      },
      {
        path: FORGOT_PASSWORD,
        element: <ForgetPassword />,
      },
      {
        path: RESET_PASSWORD,
        element: <ResetPassword />,
      },
      {
        path: VERIFY_OTP,
        element: <VerifyOTP />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
