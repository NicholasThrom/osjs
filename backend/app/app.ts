import * as express from "express";
import * as morgan from "morgan";

import { routes } from "./routers/routes";

export const app = new class App {

    public getApp() {
        const app = express();

        app.use(morgan("dev"));

        app.use("/", routes.getRouter());

        return app;
    }

}();
