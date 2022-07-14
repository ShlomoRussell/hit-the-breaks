import { io, Socket } from "socket.io-client";

let socket: Socket;
export function getSocket() {
  if (!socket) {
    socket = io();
  }
  return socket;
}
