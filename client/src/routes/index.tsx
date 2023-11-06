import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Layout, Login, Profile, Register } from "../screens";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";

export const PROTECTED = "/protected";
export const DASHBOARD = "/protected/dashboard";
export const PROFILE = "/protected/profile";

export const router = createBrowserRouter([
  { path: ROOT, element: <Login /> },
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> },
  {
    path: PROTECTED,
    element: <Layout />,
    children: [
      {
        path: DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: PROFILE,
        element: <Profile />,
      },
    ],
  },
]);
