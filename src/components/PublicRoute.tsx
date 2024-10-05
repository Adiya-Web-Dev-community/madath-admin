// src/components/PublicRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/store/features/auth/authSelectors";
import { RootState } from "@/store/types"; // Assuming you have this type defined

const PublicRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) =>
    selectIsAuthenticated(state)
  );

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
