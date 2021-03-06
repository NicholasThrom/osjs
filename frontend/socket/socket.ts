const isNode = require("is-node") as boolean;
import * as io from "socket.io-client";

export const socket = new class {
    private socketURL() {
        const pageURL = window !== undefined && window.location.origin;
        return process.env.BASE_URL || pageURL || "http://localhost:3000";
    }

    private actionQueue: (() => void)[] = [];

    private socketCache: SocketIOClient.Socket | undefined;
    private getSocket(): SocketIOClient.Socket {
        if (!this.socketCache) {
            this.socketCache = io(this.socketURL());
            this.socketCache.on("connect", () => {
                this.actionQueue.forEach((h) => { h(); });
                this.actionQueue = [];
            });
            this.socketCache.on("message", (...args: any) => {
                this.onMessageHandlers.forEach((handler) => {
                    handler(...args);
                });
            });
        }

        return this.socketCache;
    }

    private onMessageHandlers: ((...args: any[]) => void)[] = [];
    public onMessage(handler: (...args: any[]) => void) {
        if (isNode) { return; }
        this.onMessageHandlers.push(handler);
    }

    public send(...args: any[]) {
        if (isNode) { return; }
        const handler = () => {
            this.getSocket().send(...args);
        };

        if (this.getSocket().connected) {
            handler();
        } else {
            this.actionQueue.push(handler);
        }
    }
}();
