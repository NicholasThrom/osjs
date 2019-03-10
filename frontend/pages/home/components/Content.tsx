import { InterpolationWithTheme } from "@emotion/core";
import * as React from "react";
import { color } from "../../../settings/color";
import { mediaQueries } from "../../../settings/mediaQueries";

export class Content extends React.Component {

    public constructor(props: {}) {
        super(props);

        this.state = {
            email: "nicholasthrom (at) gmail.com",
        };
    }

    public render() {
        return (
            <div css={this.contentCss}>
                <div css={this.introductionCss}>
                    <div css={this.introductionLinksCss}>
                        <p>
                            <b>Nicholas Throm</b>
                        </p>
                        <p>
                            <b>GitHub:</b><br />
                            <a href="https://github.com/NicholasThrom">NicholasThrom</a>
                        </p>
                        <p>
                            <b>Email:</b><br />
                            nicholasthrom (at) gmail.com
                            </p>
                    </div>
                    <div css={this.introductionTextCss}>
                        Everyone seems to have a website,
                        so I thought I should make one too,
                        before another Nicholas Throm
                        got this domain name.
                        </div>
                </div>
            </div>
        );
    }

    private readonly contentCss: InterpolationWithTheme<any> = {
        backgroundColor: color.lightBackground,
    };

    private readonly introductionCss: InterpolationWithTheme<any> = {
        display: "grid",

        [mediaQueries.large]: {
            grid:
                "\". . . . .\" 3rem " +
                "\". links . text .\" auto " +
                "/" +
                "1fr 14rem 3rem 42rem 1fr",
        },
        [mediaQueries.medium]: {
            grid:
                "\". . . . .\" 3rem " +
                "\". links . text .\" auto " +
                "/" +
                "1fr 8rem 3rem 24rem 1fr",
        },
        [mediaQueries.small]: {
            gridTemplate:
                "\". . .\" 1.5rem" +
                "\". links .\" auto " +
                "\". . .\" 1.5rem" +
                "\". text .\" auto " +
                "/" +
                "1rem 1fr 1rem",
        },
        marginBottom: "5rem",
    };

    private readonly introductionLinksCss: InterpolationWithTheme<any> = {
        gridArea: "links",
        [mediaQueries.notSmall]: {
            textAlign: "right",
        },
        [mediaQueries.small]: {
            textAlign: "center",
        },
        "& p": {
            marginBottom: "1rem",
        },
    };

    private readonly introductionTextCss: InterpolationWithTheme<any> = {
        gridArea: "text",
        [mediaQueries.notSmall]: {
            textAlign: "left",
        },
        [mediaQueries.small]: {
            textAlign: "center",
        },
    };
}
