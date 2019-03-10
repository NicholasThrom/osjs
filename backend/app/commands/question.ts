import { commandStructureOf } from "./utils/commandStructure";

export function question(command: string) {
    const c = commandStructureOf(command);
    if (c.name.includes("?")) {
        return c.name.replace("!", "!?!").replace("?", "???") + " " + c.content;
    }
}
