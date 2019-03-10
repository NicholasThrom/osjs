import { Global, InterpolationWithTheme } from "@emotion/core";
import * as React from "react";
import { globalCss } from "../../settings/commonCss";
import { Display } from "./components/Display";
import { Entry } from "./components/Entry";

export class Home extends React.Component<
    {},
    { output: string }
> {

    public state = {
        output: "",
    };

    public constructor(props: {}) {
        super(props);
    }

    private onCommandReceived = (command: string) => {
        this.setState((prev) => ({
            output: prev.output + "\n" + command,
        }));
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
