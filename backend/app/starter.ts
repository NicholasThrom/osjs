import * as http from "http";

import { app } from "./app";

export const starter = new class Starter {
    public start() {
        const port = process.env.PORT || 3000;
        console.log("Starting server");
        console.log(`Listening on port ${port}`);
        http.createServer(app.getApp()).listen(port);
    }
}();
