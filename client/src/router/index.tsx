import { SignIn } from "@/pages";
import { AuthLayout, Layout } from "@/templates";
import { createBrowserRouter } from "react-router-dom";

export const ROOT = "/";
export const LOGIN = "/sign-in";
export const REGISTER = "/sign-up";

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
        path: LOGIN,
        element: <SignIn />,
      },
    ],
  },
]);
