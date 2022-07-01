import { QueryLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { apiSlice } from "../../app/api/apiSlice";
import { store } from "../../app/store";
import { setAllVacations } from "./usersVacationsSlice";
import { Vacations } from "./vacations.interface";

export const usersVacationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVacations: builder.query({
      query: () => "api/vacations",
      async onQueryStarted(_arg: Vacations[], { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAllVacations(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getVacationFollowers: builder.query({
      query: (vacationsId) => ({ url: `api/vacations/follow/${vacationsId}` }),
    }),
  }),
});

export const { useGetAllVacationsQuery, useGetVacationFollowersQuery } =  usersVacationsApi;
export default usersVacationsApi;
