// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/store/features/auth/authSelectors";
import { RootState } from "@/store/types";

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) =>
    selectIsAuthenticated(state)
  );

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
