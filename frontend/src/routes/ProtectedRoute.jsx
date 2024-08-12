import React from "react";
import { Navigate } from "react-router-dom";
import { accessToken } from "../services/spotifyService"; // Import your method to get access token

const ProtectedRoute = ({ element }) => {
  // If there is no access token, redirect to the login page
  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
