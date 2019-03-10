import { Global } from "@emotion/core";
import * as React from "react";
import { globalCss } from "../../settings/commonCss";

export class Home extends React.Component<{}, {}> {

    public constructor(props: {}) {
        super(props);
    }

    public render() {
        return (
            <React.Fragment>
                <Global
                    styles={{
                        ...globalCss as object,
                        ...this.backgroundStyle,
                    }}
                />
                <div style={this.mainDivStyle}>
                    Hello, world!
                </div>
            </React.Fragment>
        );
    }

    private readonly backgroundStyle = {
        body: {
            backgroundColor: "#262422",
            color: "#CC6A14",
        },
    };

    private readonly mainDivStyle = {
        height: "100vh",
    };
}
