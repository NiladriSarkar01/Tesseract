import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import { CyberLoader } from "./components/Loader";

export const AdminGuard = ({ children }) => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CyberLoader />
      </div>
    );
  }

  return authUser ? children : <Navigate to="/" replace />;
};

export const GuestGuard = ({ children }) => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CyberLoader />
      </div>
    );
  }
  return authUser ? <Navigate to="/admin/dashboard" replace /> : children;
};
