import { commandStructureOf } from "./utils/commandStructure";

export function textual(command: string) {
    const c = commandStructureOf(command);

    return ({
        vim: "Real programmers use notepad",
        emacs: "Real programmers use notepad",
        nano: "nice",
        npm: "There's a new minor update for yarn.\nType yarn i -g npm to update.",
        yarn: "There's a new minor update for npm.\nType npm i -g npm to update.",
        nvm: "Currently using node v14.0.7.",
        node: "Error: ENOENT",
        cat: "meow",
        ls: "/usr\n/root\n/www",
        wow: "wow!",
    } as any)[c.name];
}
