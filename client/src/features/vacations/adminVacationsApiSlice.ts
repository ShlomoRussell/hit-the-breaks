import { apiSlice } from "../../app/api/apiSlice";
import { Vacations } from "./vacations.interface";

const adminVacationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addVacations: builder.mutation({
      query: (vacation: Vacations) => ({
        url: `api/vacations/${vacation.id}`,
        method: "POST",
        body: vacation,
      }),
    }),
    editVacation: builder.mutation({
      query: ({id, vacation}:{id:string,vacation:FormData}) => ({
        url: `api/vacations/${id}`,
        method: "PUT",
        body: vacation,
      }),
    }),
  }),
});

export const { useAddVacationsMutation, useEditVacationMutation } =
  adminVacationsApiSlice;
export default adminVacationsApiSlice;
