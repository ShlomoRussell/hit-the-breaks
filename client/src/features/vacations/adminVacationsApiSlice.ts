import { apiSlice } from "../../app/api/apiSlice";
import { getSocket } from "../../services/socket/socket.io.service";
import { SocketEvents } from "../../services/socket/socketEvents.enum";

const adminVacationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addVacations: builder.mutation({
      query: (vacation: FormData) => ({
        url: "api/vacations/",
        method: "POST",
        body: vacation,
      }),
      async onQueryStarted() {
        const socket = getSocket();
        socket.emit(SocketEvents.vacationsUpdated);
      },
      invalidatesTags: ["VACATIONS"],
    }),
    editVacation: builder.mutation({
      query: ({ id, vacation }: { id: string; vacation: FormData }) => ({
        url: `api/vacations/${id}`,
        method: "PUT",
        body: vacation,
      }),
      async onQueryStarted() {
        const socket = getSocket();
        socket.emit(SocketEvents.vacationsUpdated);
      },
    }),
    deleteVacation: builder.mutation({
      query: (id: string) => ({
        url: `api/vacations/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted() {
        const socket = getSocket();
        socket.emit(SocketEvents.vacationsUpdated);
      },
      invalidatesTags: ["VACATIONS"],
    }),
  }),
});

export const {
  useAddVacationsMutation,
  useEditVacationMutation,
  useDeleteVacationMutation,
} = adminVacationsApiSlice;
export default adminVacationsApiSlice;
