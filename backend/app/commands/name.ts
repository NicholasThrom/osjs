import { commandStructureOf } from "./utils/commandStructure";

export function name(command: string, state: { [key: string]: any }) {
    const c = commandStructureOf(command);
    if (!["name", "whoami"].includes(c.name)) { return; }
    if (!c.content) {
        return state.name || "anonymous";
    }

    return [
        {
            type: "state",
            content: {
                name: c.content,
            },
        },
        "Name has been changed",
    ];
}
