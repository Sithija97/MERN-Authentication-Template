import { Outlet } from "react-router-dom";
import { Navbar } from "../../components";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
