import * as fs from "mz/fs";
import * as path from "path";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";

import { pathToDist } from "../path-to-dist/pathToDist";

type ReactComponentClass<PropType> = new(props: PropType) => React.Component<PropType>;

export const pageLoader = new class PageLoader {

    private _availableScriptsCache: Promise<Map<string, string>> | undefined;

    /**
     * Gets the available scripts in dist folder.
     */
    private async _availableScripts() {
        if (!this._availableScriptsCache) {
            this._availableScriptsCache = (async () => {
                const scripts = (await fs.readdir(path.join(pathToDist.getPath(), "frontend")))
                    .filter((script) => script.endsWith(".bundle.js"));
                const resultingMap = new Map<string, string>();
                for (const script of scripts) {
                    resultingMap.set(script.split(".")[0], script);
                }
                return resultingMap;
            })();
        }

        return await this._availableScriptsCache;
    }

    private async _urlForScriptName(scriptName: string) {
        return `/js/${(await this._availableScripts()).get(scriptName)}`;
    }

    /**
     * Renders the passed component and props as a string.
     */
    private _prerenderedString<PropType>(
        PageClass: ReactComponentClass<PropType>,
        props: PropType,
    ) {
        return ReactDOMServer.renderToString(React.createElement(PageClass, props));
    }

    private _fontLink() {
        return "https://fonts.googleapis.com/css?family=Aleo:300,400,700";
    }

    private _fontContents() {
        return `<link href="${this._fontLink()}" rel="stylesheet">`;
    }

    private _titleContents(title: string) {
        return `<title>${title}</title>`;
    }

    private _charsetContents() {
        return "<meta charset=\"UTF-8\">";
    }

    private _headContents(title: string) {
        return `<head>${this._charsetContents()}${this._titleContents(title)}${this._fontContents()}</head>`;
    }

    /**
     * This function is a bit horrifying.
     *
     * It has html in a template string
     * since webpacking it otherwise is difficult.
     *
     * It's all one line since it seems wasteful to strip out the whitespace after.
     *
     * Finally, the props are sent in the `window.initialReactProps` global.
     * It's not ideal, but there's no other easy way to sneak in the props
     * without another server call.
     */
    private _pageHTML(title: string, prerender: string, props: string, scriptURL: string) {
        return `<!DOCTYPE html><html>${this._headContents(title)}<body><div id="app">${prerender}</div></body><script>window.initialReactProps="${props}";</script><script src="${scriptURL}"></script></html>`;
    }

    /**
     * Returns a string containing the page that should be sent.
     */
    public async loadPage<PropType>(
        PageClass: ReactComponentClass<PropType>,
        props: PropType,
        scriptName: string,
        title: string,
    ) {
        const prerenderedString = this._prerenderedString(PageClass, props);
        const propsString = JSON.stringify(props);
        const scriptURL = await this._urlForScriptName(scriptName);
        return this._pageHTML(title, prerenderedString, propsString, scriptURL);
    }

}();
