import * as io from "socket.io";

export const onClient = (client: io.Socket) => {
    client.on("message", (...args) => {
        switch (args[0]) {
            case "connect":
                client.send("output", "Welcome to osjs");
                break;
            case "command":
                client.send("output", "wow");
                break;
        }
    });
};
