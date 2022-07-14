import { apiSlice } from "../../app/api/apiSlice";
import authSlice, { setCredentials } from "./authSlice";
import { UserModel } from "./User.interface";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    onRefresh: builder.query({
      query: () => "auth/user/refresh",
      async onQueryStarted(_arg: any, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useOnRefreshQuery } =
  authApiSlice;
