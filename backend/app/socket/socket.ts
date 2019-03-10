import * as io from "socket.io";

export const onClient = (client: io.Socket) => {
    client.on("event", (...args) => {
        // nothing
    });
    client.on("message", (...args) => {
        client.send("output", "wow");
    });
};
