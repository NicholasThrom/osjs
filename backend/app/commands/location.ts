import { commandStructureOf } from "./utils/commandStructure";

let loc = 1;
const locations = [
    "New York",
    "Toronto",
    "AWS",
    "India",
    "the moon",
    "Seoul",
    "Los Angeles",
    "Brazil",
    "Digital Ocean",
    "their basement",
    "the past",
    "a serverless environment",
    "San Francisco",
    "the cloud",
    "the microwave",
    "BC",
    "ruby on rails",
    "the future",
    "Canada",
    "a bottomless pit",
    "TerribleHack XIII",
    "npm",
    "North America",
    "The US",
    "Subway",
];

export function location(command: string, state: { [key: string]: any }) {
    const c = commandStructureOf(command);
    const name = state.name || "anonymous";
    if (c.name === "go") {
        if (c.content !== "left" && c.content !== "right") {
            return "You can only go left or right";
        }
        if (c.content === "right") {
            loc++;
            if (loc === locations.length) { loc = 0; }
        } else {
            loc--;
            if (loc < 0) { loc = locations.length - 1; }
        }

        return {
            type: "broadcast",
            content: `${name} has moved the server to ${locations[loc]}.`,
        };
    }
}
