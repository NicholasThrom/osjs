import { InterpolationWithTheme } from "@emotion/core";
import * as React from "react";
import { entryHeight } from "../../../settings/cssConstants";

export class Display extends React.Component<
    { value: string }
> {

    public endElement = React.createRef<HTMLDivElement>();

    public scrollToEnd() {
        if (this.endElement.current) {
            (this.endElement.current as any).scrollIntoView();
        }
    }

    public render() {
        return (
            <div css={this.mainStyle}>
                <div css={this.contentStyle}>
                    <pre>
                        {this.props.value}
                    </pre>
                    <div ref={this.endElement} />
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
        padding: "1rem",
    };

}
