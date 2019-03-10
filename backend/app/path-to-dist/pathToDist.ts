import * as path from "path";

export const pathToDist = new class PathToDist {
    /**
     * Find the built files both while debugging and after it's built.
     */
    public getPath() {
        if (__dirname.endsWith("dist/backend")) {
            return path.join(__dirname, "..");
        } else if (__dirname.endsWith("backend/app/path-to-dist")) {
            return path.join(__dirname, "..", "..", "..", "dist");
        } else {
            throw new Error("This file isn't where it's supposed to be.");
        }
    }
}();
