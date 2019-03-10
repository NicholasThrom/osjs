import { string } from "prop-types";
import { isArray } from "util";
import { commandStructureOf } from "./utils/commandStructure";

type File = Directory;

interface Directory {
    type: "directory";
    name: string;
    protected?: boolean;
    children: File[];
}

const root: Directory = {
    type: "directory",
    name: "root",
    protected: true,
    children: [],
};

function fileAt(file: File, path: any[]): File | undefined {
    if (path.length === 0) {
        return file;
    }
    if (file.type !== "directory") { return; }
    const child = file.children.find((file) => file.name === path[0]);
    if (!child) { return; }
    return fileAt(child, path.slice(1));
}

function makeDirectory(file: File, path: any[], name: string): boolean {
    const directory = fileAt(file, path);
    if (!directory || directory.type !== "directory") { return false; }
    directory.children.push({
        type: "directory",
        name,
        children: [],
    });
    return true;
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
            console.log(root);
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
            const directory = fileAt(root, pwd);
            console.log("name", name);
            if (!directory || directory.type !== "directory") {
                return "The directory you are in no longer exists";
            }
            directory.children.push({
                type: "directory",
                name: `${name}`,
                children: [],
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
                return `${path || "."} is not a directory`;
            }
            containingDirectory.children = containingDirectory.children
                .filter(
                    (child) => child.name !== fileToDelete[fileToDelete.length - 1] || child.protected,
                );
            return "";
        }
    }
}