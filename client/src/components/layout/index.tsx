import { Outlet } from "react-router-dom";
import WithSubnavigation from "./navbar";

export const Layout = () => {
  return (
    <>
      <WithSubnavigation />
      <Outlet />
    </>
  );
};
