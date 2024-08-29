import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthenticationService } from "../services/api_functions";

// import { authenticationService } from "@/services/api_functions";

const PrivateRoute = () => {
  let currentUser = AuthenticationService.currentUserValue;
  return currentUser ? <Outlet /> : <Navigate to="/" replace />;
  // return currentUser ? <Outlet /> : <Outlet />;
};

export { PrivateRoute };
