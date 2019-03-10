import * as io from "socket.io";
import { handleCommand } from "./handleCommand";
import { outputToClient } from "./output";

export const onClient = (client: io.Socket) => {
    client.on("message", (...args) => {
        switch (args[0]) {
            case "connect":
                outputToClient(client, "Welcome to osjs.");
                break;
            case "command":
                handleCommand(client, args[1], args[2]);
                break;
        }
    });
};
