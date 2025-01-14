// src/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element, requiredPermission }) => {
  const { isAuthenticated } = useAuth();
  const { user } = useSelector((store) => store.auth);

  if (!isAuthenticated) return <Navigate to="/adisyon-frontend/login" />;

  const hasPermission = (permission) => {
    if (user?.userPermissions?.includes("READ_ALL")) {
      return true;
    }
    return user?.userPermissions?.includes(permission);
  };
  if (!user) return element;

  if (requiredPermission && !hasPermission(requiredPermission)) {
    console.log("userrrrr", user);
    console.log(
      "requiredPermission",
      hasPermission(requiredPermission),
      "permission",
      requiredPermission
    );

    return <Navigate to="/adisyon-frontend/accessDenied" />;
  }
  return element;
};

export default ProtectedRoute;
