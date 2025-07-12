import {
  ForgetPassword,
  PageNotFound,
  ResetPassword,
  SignIn,
  SignUp,
  VerifyEmail,
} from "@/pages";
import { AuthLayout, Layout } from "@/pages/layouts";
import { createBrowserRouter } from "react-router-dom";

export const ROOT = "/";
export const SIGN_IN = "/sign-in";
export const SIGN_UP = "/sign-up";
export const FORGOT_PASSWORD = "/forgot-password";
export const RESET_PASSWORD = "/reset-password";
export const VERIFY_EMAIL = "/verify-email";

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
        path: VERIFY_EMAIL,
        element: <VerifyEmail />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
