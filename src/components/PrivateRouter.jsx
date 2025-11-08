import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ element }) {
  const { token } = useSelector((state) => state.auth);
  return token ? element : <Navigate to="/login" replace />;
}
