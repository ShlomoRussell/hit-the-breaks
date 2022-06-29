import { useState } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { store } from "../../app/store";

export function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();
  const token = useSelector(selectCurrentToken);

  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
