import { apiSlice } from "../../app/api/apiSlice";
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
            const { refetch } = dispatch(
              usersVacationsApi.endpoints.getVacationFollowers.initiate(id)
            );
            refetch();
          });
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useConnectSocketQuery } = socketApiSlice;
