import * as http from "http";

import { app } from "./app";

export const starter = new class Starter {
    public start() {
        console.log("Starting server");
        console.log("Listening on port 3000");
        http.createServer(app.getApp()).listen(3000);
    }
}();
