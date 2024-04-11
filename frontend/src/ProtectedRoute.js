import React from "react";
import isLoggedIn from "./isLoggedIn";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
