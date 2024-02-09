import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  console.log(children);
  const isAuthenticated = Cookies.get("token");
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
