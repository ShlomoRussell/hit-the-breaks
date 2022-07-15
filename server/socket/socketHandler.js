import { Socket } from "socket.io";

/** @param {Socket}socket  */
export const socketHandler = (socket) => {
  socket.on("vacationsUpdated", () => {
    socket.broadcast.emit("updateUsersVacations");
  });
    socket.on("updateFollowers", (id) => {  
    socket.broadcast.emit("followersUpdated", id);
  });
};
