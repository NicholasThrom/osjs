import { commandStructureOf } from "./utils/commandStructure";

export function fileSystem(command: string, state: { [key: string]: any }) {
    const c = commandStructureOf(command);
    switch (c.name) {
        case "pwd":
            return state.pwd.join("/");
    }
}
