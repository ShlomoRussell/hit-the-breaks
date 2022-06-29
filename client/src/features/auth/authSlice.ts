import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: JSON.parse(localStorage.getItem("hit-the-breaks-token")!) || null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem("hit-the-breaks-token",JSON.stringify(token));
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: { auth: { user: string } }) =>
  state.auth.user;
export const selectCurrentToken = (state: { auth: { token: string } }) =>
  state.auth.token;
