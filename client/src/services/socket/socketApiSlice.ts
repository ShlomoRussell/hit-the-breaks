import { apiSlice } from "../../app/api/apiSlice";
import reportApiSlice from "../../features/reports/reportsApiSlice";
import usersVacationsApi from "../../features/vacations/userVacationsApiSlice";
import { getSocket } from "./socket.io.service";
import { SocketEvents } from "./socketEvents.enum";
import { setVacationIsUpdated } from "./updateSlice";

const socketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    connectSocket: builder.query({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        arg,
        { dispatch, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          const socket = getSocket();
          socket.on(SocketEvents.updateUsersVacations, () => {
            dispatch(setVacationIsUpdated(true));
          });
          socket.on(SocketEvents.followersUpdated, (id: string) => {
            const { refetch: refetchFollowers } = dispatch(
              usersVacationsApi.endpoints.getVacationFollowers.initiate(id)
            );
            const { refetch: refetchReports } = dispatch(
              reportApiSlice.endpoints.getReports.initiate(null)
            );
            refetchReports();
            refetchFollowers();
          });
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useConnectSocketQuery } = socketApiSlice;
