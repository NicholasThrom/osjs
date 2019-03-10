import * as express from "express";

import { Home } from "../../../frontend/pages/home/Home";
import { pageLoader } from "../page-loader/pageLoader";

export const homeRouter = new class HomeRouter {
    public getRouter() {
        const router = express.Router();
        router.get("/", async function (req, res) {
            res.send(await pageLoader.loadPage(Home, {}, "Home", "Home"));
        });
        return router;
    }
}();
