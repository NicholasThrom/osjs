import { Socket } from "socket.io";

export function outputToClient(client: Socket, message: string) {
    client.send("output", message);
}

export function stateToClient(client: Socket, state: { [key: string]: any }) {
    client.send("state", state);
}

export function outputToEveryone(client: Socket, message: string) {
    client.broadcast.send("output", message);
}
