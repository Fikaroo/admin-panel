import { useAuth } from "@/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  // if (!isAuthenticated) {
  //   const navigate = useNavigate();
  //   navigate('/login');
  //   return null;
  // }

  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
