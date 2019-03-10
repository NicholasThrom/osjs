import * as Color from "color";

const mainHue = 210;

const darkBackgroundColor = Color.hsv(mainHue, 70, 10);
const lightBackgroundColor = Color.hsv(mainHue, 5, 90);

const lightTextColor = Color.hsv(mainHue, 10, 90);
const darkTextColor = Color.hsv(mainHue, 70, 10);

const linkColor = Color.hsv(230, 60, 90);
const visitedLinkColor = Color.hsv(280, 50, 70);

export const color = {
    darkBackground: darkBackgroundColor.hex().toString(),
    lightBackground: lightBackgroundColor.hex().toString(),

    lightText: lightTextColor.hex().toString(),
    darkText: darkTextColor.hex().toString(),

    link: linkColor.hex().toString(),
    visitedLink: visitedLinkColor.hex().toString(),
};
