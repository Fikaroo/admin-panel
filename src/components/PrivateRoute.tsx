import { useAuth } from "@/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} state={pathname} replace />;
};

export default PrivateRoute;
