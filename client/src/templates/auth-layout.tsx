import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    // <div className="flex justify-center h-screen">
    //   <div className="sm:w-[448px] w-full px-10 pt-20 bg-amber-200">
    <Outlet />
    //   </div>
    // </div>
  );
};
