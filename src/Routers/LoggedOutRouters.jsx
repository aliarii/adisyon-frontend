import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "../Auth/ProtectedRoute";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";

const LoggedOutRouters = () => {
  return (
    <Routes>
      <Route path="/adisyon-frontend/login" element={<LoginPage />} />
      <Route path="/adisyon-frontend/register" element={<RegisterPage />} />
      <Route
        path="/adisyon-frontend/*"
        element={<ProtectedRoute element={<HomePage />} />}
      />
    </Routes>
  );
};

export default LoggedOutRouters;
