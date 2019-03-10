import { string } from "prop-types";
import { isArray } from "util";
import { commandStructureOf } from "./utils/commandStructure";

type File = Directory | SingleFile;

interface Directory {
    type: "directory";
    name: string;
    protected?: boolean;
    children: File[];
}

interface SingleFile {
    type: "file";
    contents: string;
    name: string;
    protected?: boolean;
}

const root: Directory = {
    type: "directory",
    name: "root",
    protected: true,
    children: [],
};

function fileAt(file: File, path: any[]): File | undefined {
    console.log("here", file, path);
    if (path.length === 0) {
        console.log("here2", file, path);
        return file;
    }
    if (file.type !== "directory") {
        console.log("here3", file, path);
        return;
    }
    console.log("here4", file, path);
    const child = file.children.find((file) => file.name === path[0]);
    console.log("here5", file, path, child);
    if (!child) { return; }
    return fileAt(child, path.slice(1));
}

function correctPath(path: any[]): any[] {
    return path.reduce(
        (a, b) => {
            if (b === "") { return a; }
            if (b === ".") { return a; }
            if (b === "..") { return a.slice(0, -1); }
            return [...a, b];
        },
        [],
    );
}

function addPath(pwd: any[], path: string): any[] {
    let newPWD;
    if (path.startsWith("/")) {
        newPWD = path.split("/");
    } else {
        newPWD = [...pwd, ...path.split("/")];
    }
    return correctPath(newPWD);
}

export function fileSystem(command: string, state: { [key: string]: any }) {
    const c = commandStructureOf(command);
    if (!isArray(state.pwd)) {
        return "not sure how but you broke something";
    }
    const pwd = state.pwd;
    const name = c.content;
    const path = c.content;
    switch (c.name) {
        case "pwd": {
            return `/${pwd.join("/") || ""}`;
        }
        case "cd": {
            const newPath = addPath(pwd, path);
            const fileThere = fileAt(root, newPath);
            if (!fileThere || fileThere.type !== "directory") {
                return `${path || "."} is not a directory`;
            }
            return {
                type: "state",
                content: {
                    pwd: addPath(pwd, path),
                },
            };
        }
        case "ls": {
            const directory = fileAt(root, addPath(pwd, path));
            if (!directory) {
                return `${path || "."} is not a directory`;
            }
            if (directory.type !== "directory") {
                return `${path || "."} is not a directory`;
            }
            return directory.children
                .map((child) => {
                    if (child.type === "directory") {
                        return `${child.name}/`;
                    }
                    return child.name;
                })
                .join("\n");
        }
        case "mkdir": {
            const fileToCreate = addPath(pwd, path);
            const containingPath = fileToCreate.slice(0, -1);
            const containingDirectory = fileAt(root, containingPath);
            if (!containingDirectory) {
                return `${path || "."} does not exist`;
            }
            if (containingDirectory.type !== "directory") {
                return `${path || "."} is invalid`;
            }
            containingDirectory.children.push({
                type: "directory",
                name: `${fileToCreate[fileToCreate.length - 1]}`,
                children: [],
            });
            return [];
        }
        case "touch": {
            const fileToCreate = addPath(pwd, path);
            const containingPath = fileToCreate.slice(0, -1);
            const containingDirectory = fileAt(root, containingPath);
            if (!containingDirectory) {
                return `${path || "."} does not exist`;
            }
            if (containingDirectory.type !== "directory") {
                return `${path || "."} is invalid`;
            }
            containingDirectory.children.push({
                type: "file",
                name: `${fileToCreate[fileToCreate.length - 1]}`,
                contents: "",
            });
            return [];
        }
        case "cat": {
            if (path === "") { return; }
            const file = fileAt(root, addPath(pwd, path));
            console.log(file);
            if (!file) {
                return `${path || "."} is not a file`;
            }
            if (file.type !== "file") {
                return `${path || "."} is a directory`;
            }
            return file.contents;
        }
        case "echo": {
            const things = c.content.split(">");
            if (things.length !== 2) { return; }
            const fileToCreate = addPath(pwd, things[1].trim());
            const containingPath = fileToCreate.slice(0, -1);
            const containingDirectory = fileAt(root, containingPath);
            if (!containingDirectory) {
                return `${path || "."} does not exist`;
            }
            if (containingDirectory.type !== "directory") {
                return `${path || "."} is invalid`;
            }
            containingDirectory.children.push({
                type: "file",
                name: `${fileToCreate[fileToCreate.length - 1]}`,
                contents: things[0].trim(),
            });
            return [];
        }
        case "rm": {
            const fileToDelete = addPath(pwd, path);
            const containingPath = fileToDelete.slice(0, -1);
            const containingDirectory = fileAt(root, containingPath);
            if (!containingDirectory) {
                return `${path || "."} does not exist`;
            }
            if (containingDirectory.type !== "directory") {
                return `${path || "."} is invalid`;
            }
            containingDirectory.children = containingDirectory.children
                .filter(
                    (child) => child.name !== fileToDelete[fileToDelete.length - 1] || child.protected,
                );
            return "";
        }
    }
}
