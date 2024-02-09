import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = Cookies.get("token");
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
