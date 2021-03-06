import { Global, InterpolationWithTheme } from "@emotion/core";
import * as React from "react";
import { globalCss } from "../../settings/commonCss";
import { socket } from "../../socket/socket";
import { Display } from "./components/Display";
import { Entry } from "./components/Entry";
const fishNames: { random(): string } = require("fish-names");

export class Home extends React.Component<
    {},
    {
        output: string,
        name: string,
        pwd: string[],
    }
> {

    private display = React.createRef<Display>();

    public state = {
        output: "",
        name: fishNames.random(),
        pwd: [],
    };

    public constructor(props: {}) {
        super(props);
    }

    public componentDidMount() {
        socket.send("connect");

        socket.onMessage((...args) => {
            switch (args[0]) {
                case "output":
                    this.addOutput(args[1]);
                    break;
                case "state":
                    this.setState(args[1]);
                    break;
            }
        });
    }

    private addOutput(output: string, withNewLine = true) {
        this.setState((prev) => ({
            output: prev.output + (withNewLine ? "\n" : "") + output,
        }));
        if (this.display.current) {
            this.display.current.scrollToEnd();
        }
    }

    private onCommandReceived = (command: string) => {
        socket.send("command", command, this.state);
    }

    public render() {
        return (
            <React.Fragment>
                <Global
                    styles={{
                        ...globalCss as object,
                        ...this.backgroundStyle as object,
                    }}
                />
                <div css={this.mainDivStyle}>
                    <Display
                        value={this.state.output}
                        ref={this.display}
                    />
                    <Entry onCommandReceived={this.onCommandReceived} />
                </div>
            </React.Fragment>
        );
    }

    private readonly backgroundStyle: InterpolationWithTheme<any> = {
        body: {
            backgroundColor: "#262422",
            color: "#CC6A14",
        },
    };

    private readonly mainDivStyle: InterpolationWithTheme<any> = {
        height: "100vh",
    };
}
