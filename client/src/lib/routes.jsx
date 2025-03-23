import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext.jsx";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <h1>Cargando...</h1>;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export const ProtectedRouteAdmin = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <h1>Cargando...</h1>;
  if (!isAuthenticated && !loading && user.id === "admin")
    return <Navigate to="/login" replace />;
  return <Outlet />;
};
