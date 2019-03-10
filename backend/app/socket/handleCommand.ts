import { Socket } from "socket.io";
import { echo } from "../commands/echo";
import { unknownCommand } from "../commands/unknownCommand";
import { outputToClient } from "./output";

export function handleCommand(client: Socket, command: string) {
    for (const commandHandler of commandHandlers) {
        const result = commandHandler(command);
        if (result) {
            outputToClient(client, result);
            break;
        }
    }
}

const commandHandlers: ((command: string) => string | undefined)[] = [
    echo,
    unknownCommand,
];
