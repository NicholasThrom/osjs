import { commandStructureOf } from "./utils/commandStructure";

export function textual(command: string) {
    const c = commandStructureOf(command);

    return ({
        vim: "Real programmers use notepad",
        vi: "Real programmers use notepad",
        emacs: "Real programmers use notepad",
        chmod: "Invalid identifier",
        mkdir: "",
        pwd: "/usr/root/servers/osjs/repo/dist/backend/bundles/js/index/node_modules/express",
        kill: "that's illegal",
        killall: "that's illegal",
        more: "less is more",
        less: "more or less",
        nice: "thanks",
        printf: "\\0",
        sed: "Invalid argument",
        sleep: "zzz",
        time: "wow",
        what: "what?",
        whoami: "name",
        sudo: "fine",
        find: "We don't have any",
        alias: "echo",
        date: "Sun 10 Mar 2021 15:40:03 EDT",
        diff: "Incomparable",
        false: "true",
        true: "true",
        head: "Invalid argume",
        tail: "lid argument",
        awk: "We don't have any",
        mv: "Invalid argument",
        cp: "Invalid argument",
        rm: "rm: is a directory",
        rmdir: "Error: rmdir is a directory",
        nano: "nice",
        npm: "There's a new minor update for yarn.\nType yarn i -g npm to update.",
        yarn: "There's a new minor update for npm.\nType npm i -g npm to update.",
        nvm: "Currently using node v14.0.7.",
        node: "Error: ENOENT",
        cat: "meow",
        ls: "/usr\n/root\n/www",
        wow: "wow!",
        help: "jsos supports \"most\" unix commands.\n"
            + "Additionally, \"say [message]\" sends a message to everyone.\n"
            + "For more information about how to use a command, type \"man [command]\".\n",
        "\"help\"": "Very funny. Without the quotes, please.",
        grep: "Found 9 results",
        git: "fatal: The current branch test has no upstream branch.\nTo push the current branch and set the remote as upstream, use\n\n    git push --set-upstream ugh\n",
    } as any)[c.name];
}
