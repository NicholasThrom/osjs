import { InterpolationWithTheme } from "@emotion/core";
import * as React from "react";
import { color } from "../../../settings/color";
import { font } from "../../../settings/font";
import { mediaQueries } from "../../../settings/mediaQueries";

export class Head extends React.Component {
    public render() {
        return (
            <div css={this.headCss}>
                <h1 css={this.nameCss}>Nicholas Throm</h1>
                <div css={this.separatorCss}>* * *</div>
                <div css={this.optionsCss}>
                    <a css={this.optionCss}>Projects</a>
                    <a css={this.optionCss}>Resume</a>
                </div>
            </div>
        );
    }

    private headCss: InterpolationWithTheme<any> = {
        backgroundColor: color.darkBackground,
        color: color.lightText,

        height: "100vh",

        display: "grid",

        [mediaQueries.notSmall]: {
            gridTemplate:
                "\".\" 1fr " +
                "\"title\" 7rem " +
                "\"separator\" 3.5rem " +
                "\"options\" 3rem " +
                "\".\" 1fr " +
                "/" +
                "1fr",
        },
        [mediaQueries.small]: {
            gridTemplate:
                "\".\" 1fr " +
                "\"title\" 3.5rem " +
                "\"separator\" 2rem " +
                "\"options\" 2rem " +
                "\".\" 1fr " +
                "/" +
                "1fr",
        },
    };

    private readonly nameCss: InterpolationWithTheme<any> = {
        [mediaQueries.notSmall]: {
            fontSize: "5rem",
        },
        [mediaQueries.small]: {
            fontSize: "3rem",
        },
        ...font.serif,

        gridArea: "title",

        textAlign: "center",
        alignSelf: "end",
        justifySelf: "center",
    };

    private readonly separatorCss: InterpolationWithTheme<any> = {
        [mediaQueries.notSmall]: {
            fontSize: "5rem",
        },
        [mediaQueries.small]: {
            fontSize: "3rem",
        },
        ...font.serif,

        gridArea: "separator",

        textAlign: "center",
        alignSelf: "start",
        justifySelf: "center",
    };

    private readonly optionsCss: InterpolationWithTheme<any> = {
        [mediaQueries.notSmall]: {
            fontSize: "3rem",
        },
        [mediaQueries.small]: {
            fontSize: "1.5rem",
        },
        ...font.serifLight,

        gridArea: "options",

        alignSelf: "center",
        justifySelf: "center",
    };

    private readonly optionCss: InterpolationWithTheme<any> = {
        padding: "2rem",
        color: color.lightText,
    };
}
