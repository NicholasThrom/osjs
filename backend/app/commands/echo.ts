import { commandStructureOf } from "./utils/commandStructure";

export function echo(command: string) {
    const c = commandStructureOf(command);
    if (c.name !== "echo") { return; }

    return c.content;
}
