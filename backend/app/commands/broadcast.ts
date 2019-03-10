import { commandStructureOf } from "./utils/commandStructure";

const names = ["say", "all", "broadcast"];

export function broadcast(command: string, state: { [key: string]: any }) {
    const c = commandStructureOf(command);
    const name = state.name || "anonymous";
    if (names.includes(c.name)) {
        return {
            type: "broadcast",
            content: `${name}: ${c.content}`,
        };
    }
}
