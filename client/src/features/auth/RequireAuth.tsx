import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUserId } from "./authSlice";
import usersVacationsApi from "../vacations/userVacationsApiSlice";
import { useAppDispatch } from "../../app/hooks";
import { authApiSlice } from "./authApiSlice";

export function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();
  const dispatch = useAppDispatch();
  const token = useSelector(selectCurrentToken);
  const userId = useSelector(selectCurrentUserId);
  
  if (!userId) dispatch(authApiSlice.endpoints.onRefresh.initiate(0));
  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
