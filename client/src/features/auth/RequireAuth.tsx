import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUserId } from "./authSlice";
import usersVacationsApi from "../vacations/userVacationsApiSlice";
import { useAppDispatch } from "../../app/hooks";
import { authApiSlice } from "./authApiSlice";
import { useEffect } from "react";

export function RequireAuth() {
  let location = useLocation();
  const dispatch = useAppDispatch();
  const token = useSelector(selectCurrentToken);
  const userId = useSelector(selectCurrentUserId);

  
  useEffect(() => {
    if (!userId) {
      dispatch(authApiSlice.endpoints.onRefresh.initiate(0));
    }
  }, []);

  return token ? (
    <Outlet/>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
