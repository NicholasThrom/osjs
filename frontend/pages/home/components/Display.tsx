import { InterpolationWithTheme } from "@emotion/core";
import * as React from "react";
import { entryHeight } from "../../../settings/cssConstants";

export class Display extends React.Component<{}, {}> {

    public render() {
        return (
            <div css={this.mainStyle}>
                <div css={this.contentStyle}>
                    <div>
                        Hello, world!<br/>
                        Hello, world!<br/>
                        Hello, world!<br/>
                        Hello, world!<br/>
                        Hello, world!<br/>
                        Hello, world!<br/>
                        Hello, world!<br/>
                        Hello, world!<br/>
                        Hello, world!<br/>
                        Hello, world!<br/>
                        Hello, world!<br/>
                        Hello, world!<br/>
                        Hello, world!<br/>
                        Hello, world!<br/>
                        Hello, world!<br/>
                        Hello, world!<br/>
                        Hello, world!<br/>
                        Hello, world!<br/>
                    </div>
                </div>
            </div>
        );
    }

    private readonly mainStyle: InterpolationWithTheme<any> = {
        height: `calc(100vh - ${entryHeight})`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
    };

    private readonly contentStyle: InterpolationWithTheme<any> = {
        overflow: "auto",
    };

}
