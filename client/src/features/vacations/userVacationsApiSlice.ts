import { apiSlice } from "../../app/api/apiSlice";
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
      query: (vacationsId: string) => ({
        url: `api/vacations/follow/${vacationsId}`,
      }),
      providesTags: (_result, _error, vacationId) => [
        { type: "FOLLOWERS", id: vacationId },
      ],
    }),
    follow: builder.mutation({
      query: (vacationId: string) => ({
        url: `api/vacations/follow/${vacationId}`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, vacationId) => [
        { type: "FOLLOWERS", id: vacationId },
      ],
    }),
    unFollow: builder.mutation({
      query: (vacationId: string) => ({
        url: `api/vacations/follow/${vacationId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, vacationId) => [
        { type: "FOLLOWERS", id: vacationId },
      ],
    }),
  }),
});

export const {  useGetAllVacationsQuery,  useGetVacationFollowersQuery,  useFollowMutation,useUnFollowMutation} = usersVacationsApi;
export default usersVacationsApi;
