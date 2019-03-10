import { Global, InterpolationWithTheme } from "@emotion/core";
import * as React from "react";
import { globalCss } from "../../settings/commonCss";
import { Display } from "./components/Display";
import { Entry } from "./components/Entry";

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
                        ...this.backgroundStyle as object,
                    }}
                />
                <div css={this.mainDivStyle}>
                    <Display />
                    <Entry />
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
