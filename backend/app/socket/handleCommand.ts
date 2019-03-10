import { Socket } from "socket.io";
import { broadcast } from "../commands/broadcast";
import { echo } from "../commands/echo";
import { question } from "../commands/question";
import { textual } from "../commands/textual";
import { unknownCommand } from "../commands/unknownCommand";
import { outputToClient, outputToEveryone } from "./output";

export function handleCommand(client: Socket, command: string, otherData: {}) {
    for (const commandHandler of commandHandlers) {
        const result = commandHandler(command, otherData);
        if (result) {
            if (typeof result === "string" ) {
                outputToClient(client, `> ${command}\n` + result);
            } else if (result.type === "broadcast") {
                outputToClient(client, `> ${command}\n${result.content}`);
                outputToEveryone(client, `${result.content}`);
            }
            break;
        }
    }
}

const commandHandlers: ((command: string, otherData: {}) => string | { [key: string]: any } | undefined)[] = [
    echo,
    broadcast,
    question,
    textual,
    unknownCommand,
];
