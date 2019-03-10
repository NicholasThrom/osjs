import * as express from "express";
import { homeRouter } from "./homeRouter";
import { jsRouter } from "./jsRouter";

export const routes = new class Routes {
    public getRouter() {
        const router = express.Router();
        router.use("/js", jsRouter.getRouter());
        router.use("/", homeRouter.getRouter());
        return router;
    }
}();
