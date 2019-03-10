import { color } from "./color";

export const globalCss = {
    "*": {
        padding: 0,
        margin: 0,
    },

    a: {
        color: color.link,
        textDecoration: "none",
        cursor: "pointer",
        ":hover": {
            textDecoration: "underline",
        },
        ":visited": {
            textDecoration: "underline",
            color: color.visitedLink,
        },
    },
};
