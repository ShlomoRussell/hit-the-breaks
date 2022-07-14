import { Action, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "./User.interface";

const authInitialState = (): UserModel => ({
  id: null,
  email: null,
  username: null,
  firstName: null,
  lastName: null,
  isAdmin: false,
  token: JSON.parse(localStorage.getItem("hit-the-breaks-token")!) || null,
});

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState(),
  reducers: {
    setCredentials: (state, action) => {
      return { ...state, ...action.payload };
    },
    logOut: (_state, _action) => {
      return authInitialState()
    },
  },
});

export const authMiddleware =
  (_store: any) => (next: (arg: any) => any) => (action: Action<unknown>) => {
    if (authSlice.actions.setCredentials.match(action)) {
      localStorage.setItem(
        "hit-the-breaks-token",
        JSON.stringify(action.payload.token)
      );
    } else if (authSlice.actions.logOut.match(action)) {
      localStorage.removeItem("hit-the-breaks-token");
    }
    return next(action);
  };

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: { auth: UserModel }) =>
  state.auth.username;
export const selectCurrentToken = (state: { auth: UserModel }) =>
  state.auth.token;
export const selectIsAdmin = (state: { auth: UserModel }) => state.auth.isAdmin;
export const selectCurrentUserId = (state: { auth: UserModel }) =>
  state.auth.id;
