import * as express from "express";
import * as path from "path";
import { pathToDist } from "../path-to-dist/pathToDist";

export const jsRouter = new class JSRouter {
    public getRouter() {
        const router = express.Router();
        router.use("/", express.static(path.join(pathToDist.getPath(), "frontend")));
        return router;
    }
}();
