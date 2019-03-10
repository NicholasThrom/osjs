import { isArray } from "util";
import { commandStructureOf } from "./utils/commandStructure";

export function fileSystem(command: string, state: { [key: string]: any }) {
    const c = commandStructureOf(command);
    if (!isArray(state.pwd)) {
        return "not sure how but you broke something";
    }
    switch (c.name) {
        case "pwd":
            return `/${state.pwd.join("/") || ""}`;
        case "cd":
            let newPWD;
            if (c.content === "..") {
                newPWD = state.pwd.slice(-1);
            } else if (c.content.startsWith("/")) {
                newPWD = c.content.split("/");
            } else if (c.content.startsWith("./")) {
                newPWD = [...state.pwd, ...c.content.slice(2).split("/")];
            } else {
                newPWD = [...state.pwd, ...c.content.split("/")];
            }
            newPWD = newPWD.filter((c) => c !== "");
            return {
                type: "state",
                content: {
                    pwd: newPWD,
                },
            };
    }
}
