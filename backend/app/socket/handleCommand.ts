import { Socket } from "socket.io";
import { isArray } from "util";
import { broadcast } from "../commands/broadcast";
import { echo } from "../commands/echo";
import { man } from "../commands/man";
import { name } from "../commands/name";
import { question } from "../commands/question";
import { textual } from "../commands/textual";
import { unknownCommand } from "../commands/unknownCommand";
import { outputToClient, outputToEveryone, stateToClient } from "./output";

type Handler = (command: string, otherData: { [key: string]: any }) => string | { [key: string]: any } | undefined;

export function handleCommand(client: Socket, command: string, otherData: { [key: string]: any }) {
    for (const commandHandler of commandHandlers) {
        const result = commandHandler(command, otherData);
        if (result) {
            handleResult(client, command, result);
            break;
        }
    }
}

function handleResult(client: Socket, command: string, result: string | { [key: string]: any }) {
    if (typeof result === "string") {
        outputToClient(client, `> ${command}\n` + result);
    } else if (isArray(result)) {
        result.forEach((r) => { handleResult(client, command, r); });
    } else if (typeof result === "object") {
        if (result.type === "broadcast") {
            outputToClient(client, `> ${command}\n${result.content}`);
            outputToEveryone(client, `${result.content}`);
        } else if (result.type === "state") {
            stateToClient(client, result.content);
        }
    }
}

const commandHandlers: Handler[] = [
    echo,
    broadcast,
    question,
    man,
    name,
    textual,
    unknownCommand,
];
