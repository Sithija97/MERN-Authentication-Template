import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "../../components";
import { RootState, useAppSelector } from "../../store/store";

type IProps = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: IProps) => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export const Layout = () => {
  return (
    <PrivateRoute>
      <Navbar />
      <Outlet />
    </PrivateRoute>
  );
};
