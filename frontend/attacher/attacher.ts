import "babel-polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";

type ReactComponentClass = new (props: any) => React.Component<any>;

export const attacher = new class Attacher {
    public attach(PageClass: ReactComponentClass) {
        const propString = (window as any).initialReactProps;
        if (typeof propString !== "string") {
            throw new Error("Failed to load props");
        }
        const props = JSON.parse(propString);

        ReactDOM.hydrate(React.createElement(PageClass, props), document.getElementById("app"));
    }
}();
