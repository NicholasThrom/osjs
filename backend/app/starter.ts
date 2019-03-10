import * as http from "http";
import * as io from "socket.io";

import { app } from "./app";
import { onClient } from "./socket/socket";

export const starter = new class Starter {
    public start() {
        const port = process.env.PORT || 3000;
        console.log("Starting server");
        console.log(`Listening on port ${port}`);
        const server = http.createServer(app.getApp());
        io(server).on("connection", onClient);
        server.listen(port);
    }
}();
