import { InterpolationWithTheme } from "@emotion/core";
import * as React from "react";
import { entryHeight } from "../../../settings/cssConstants";

export class Entry extends React.Component {

    public state = {
        currentInput: "",
    };

    private readonly onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            currentInput: event.target.value,
        });
    }

    public render() {
        return (
            <div css={this.mainStyle}>
                <div css={this.contentStyle}>
                    <div css={this.promptStyle}>
                        {">"}
                    </div>
                    <input css={this.inputStyle} onChange={this.onChange} value={this.state.currentInput} />
                </div>
            </div>
        );
    }

    private readonly mainStyle: InterpolationWithTheme<any> = {
        height: entryHeight,
        padding: "0px 1rem",
    };

    private readonly contentStyle: InterpolationWithTheme<any> = {
        width: "100%",
        display: "flex",
    };

    private readonly promptStyle: InterpolationWithTheme<any> = {
        paddingRight: "0.5rem",
    };

    private readonly inputStyle: InterpolationWithTheme<any> = {
        flexGrow: 1,
    };

}
