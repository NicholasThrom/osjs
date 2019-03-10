import { Socket } from "socket.io";
import { echo } from "../commands/echo";
import { question } from "../commands/question";
import { textual } from "../commands/textual";
import { unknownCommand } from "../commands/unknownCommand";
import { outputToClient } from "./output";

export function handleCommand(client: Socket, command: string, otherData: {}) {
    for (const commandHandler of commandHandlers) {
        const result = commandHandler(command, otherData);
        if (result) {
            outputToClient(client, `> ${command}\n` + result);
            break;
        }
    }
}

const commandHandlers: ((command: string, otherData: {}) => string | undefined)[] = [
    echo,
    question,
    textual,
    unknownCommand,
];
