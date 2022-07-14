import { Socket } from "socket.io";

/** @param {Socket}socket  */
export const socketHandler = (socket) => {
    console.log("someone connected");
    socket.on("updatedVacations", () => {
        console.log('it workd')
    });
};
