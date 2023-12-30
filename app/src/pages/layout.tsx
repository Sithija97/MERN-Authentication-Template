import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../components";
// import { RootState, useAppSelector } from "../store/store";

type IProps = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: IProps) => {
  //   const { user } = useAppSelector((state: RootState) => state.auth);
  const user = true;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};
export const Layout = () => {
  return (
    <PrivateRoute>
      <Header />
      <div className="flex items-center justify-center h-layout bg-gray-50">
        <Outlet />
      </div>
    </PrivateRoute>
  );
};
