import { commandStructureOf } from "./utils/commandStructure";

export function unknownCommand(command: string) {
    const c = commandStructureOf(command);
    return `Unknown command "${c.name}". Type "help" for help.`;
}
