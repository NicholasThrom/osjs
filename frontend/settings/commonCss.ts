import { InterpolationWithTheme } from "@emotion/core";

export const globalCss: InterpolationWithTheme<any> = {
    "*": {
        padding: 0,
        margin: 0,
        fontFamily: "'Fira Mono', monospace",
        lineHeight: 1.5,
    },

    input: {
        backgroundColor: "transparent",
        borderStyle: "none",
        outline: "none",
        color: "inherit",
        fontFamily: "inherit",
        fontSize: "inherit",
    },
};
