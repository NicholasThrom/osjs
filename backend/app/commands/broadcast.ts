import { commandStructureOf } from "./utils/commandStructure";

const names = ["say", "all", "broadcast"];

export function broadcast(command: string) {
    const c = commandStructureOf(command);
    if (names.includes(c.name)) {
        return {
            type: "broadcast",
            content: c.content,
        };
    }
}
