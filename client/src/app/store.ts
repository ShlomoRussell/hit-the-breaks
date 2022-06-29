import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authSlice from '../features/auth/authSlice';
import { apiSlice } from './api/apiSlice';


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
   auth:authSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true
});

// const authMiddleware = (store) => (next) => (action) => {
//   if (authActions.login.match(action)) {
//     // Note: localStorage expects a string
//     localStorage.setItem("isAuthenticated", "true");
//   } else if (authActions.logout.match(action)) {
//     localStorage.setItem("isAuthenticated", "false");
//   }
//   return next(action);
// };
setupListeners(store.dispatch)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
