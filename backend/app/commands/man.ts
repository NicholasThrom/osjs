import stripIndent from "strip-indent";
import { commandStructureOf } from "./utils/commandStructure";

export function man(command: string) {
    const c = commandStructureOf(command);
    if (c.name !== "man") { return; }
    return stripIndent(`
        NAME
            ${command}

        SYNOPSIS:
            ${command}

        DESCRIPTION
            Shows the man page for the command "${command}".

            The following options are available:
    `.slice(1));
}
