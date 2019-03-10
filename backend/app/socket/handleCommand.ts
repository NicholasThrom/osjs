import { Socket } from "socket.io";
import { echo } from "../commands/echo";
import { textual } from "../commands/textual";
import { unknownCommand } from "../commands/unknownCommand";
import { outputToClient } from "./output";

export function handleCommand(client: Socket, command: string) {
    for (const commandHandler of commandHandlers) {
        const result = commandHandler(command);
        if (result) {
            outputToClient(client, `> ${command}\n` + result);
            break;
        }
    }
}

const commandHandlers: ((command: string) => string | undefined)[] = [
    echo,
    textual,
    unknownCommand,
];
