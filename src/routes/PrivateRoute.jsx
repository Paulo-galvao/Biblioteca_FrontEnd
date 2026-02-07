import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router";

function PrivateRoute() {

  const { data, loading } = useContext(UserContext);

  if (loading ) return null;
  if (!data) return <Navigate to="/login" replace />;   

  return <Outlet />;
}

export default PrivateRoute;
