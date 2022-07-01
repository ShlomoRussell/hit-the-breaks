import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsAdmin } from "./authSlice";

function OnlyUsers({ children }: { children: JSX.Element }) {
  const isAdmin = useSelector(selectIsAdmin);
  const location = useLocation();
  let from = (location.state as any)?.from?.pathname || "/";
  return isAdmin ? children : <Navigate to={from} replace />;
}

export default OnlyUsers;
