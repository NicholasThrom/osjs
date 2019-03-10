import { Socket } from "socket.io";

export function outputToClient(client: Socket, message: string) {
    client.send("output", message);
}
