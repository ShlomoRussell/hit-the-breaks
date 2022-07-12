import { apiSlice } from "../../app/api/apiSlice";

const adminVacationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addVacations: builder.mutation({
      query: (vacation: FormData) => ({
        url: "api/vacations/",
        method: "POST",
        body: vacation,
      }),
      invalidatesTags: ["VACATIONS"],
    }),
    editVacation: builder.mutation({
      query: ({ id, vacation }: { id: string; vacation: FormData }) => ({
        url: `api/vacations/${id}`,
        method: "PUT",
        body: vacation,
      }),
    }),
    deleteVacation: builder.mutation({
      query: (id: string) => ({
        url: `api/vacations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["VACATIONS"],
    }),
  }),
});

export const { useAddVacationsMutation, useEditVacationMutation,useDeleteVacationMutation } =
  adminVacationsApiSlice;
export default adminVacationsApiSlice;
