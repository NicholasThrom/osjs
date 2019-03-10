import { InterpolationWithTheme } from "@emotion/core";
import * as React from "react";
import { entryHeight } from "../../../settings/cssConstants";
import { keyCode } from "../../../util/keyCode";

export class Entry extends React.Component<
    { onCommandReceived: (command: string) => void },
    { currentInput: string }
> {

    public state = {
        currentInput: "",
    };

    private setInput(input: string) {
        this.setState({
            currentInput: input,
        });
    }

    private readonly onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setInput(event.target.value);
    }

    private readonly onKeyDown = (event: React.KeyboardEvent) => {
        if (event.which === keyCode.enter) {
            this.props.onCommandReceived(this.state.currentInput);
            this.setInput("");
        }
    }

    public render() {
        return (
            <div css={this.mainStyle}>
                <div css={this.contentStyle}>
                    <div css={this.promptStyle}>
                        {">"}
                    </div>
                    <input
                        css={this.inputStyle}
                        onChange={this.onChange}
                        value={this.state.currentInput}
                        onKeyDown={this.onKeyDown}
                        autoFocus={true}
                    />
                </div>
            </div>
        );
    }

    private readonly mainStyle: InterpolationWithTheme<any > = {
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
