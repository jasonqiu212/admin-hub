import React from "react";
import { Navigate, Outlet } from "react-router";

// import { useAuth } from "../../features/auth/hooks/use-auth";

export const ProtectedRoute: React.FC = () => {
  // const { token } = useAuth();

  // if (!token) {
  if (false) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
