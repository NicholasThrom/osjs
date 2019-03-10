import { Global, InterpolationWithTheme } from "@emotion/core";
import * as React from "react";
import EventListener from "react-event-listener";
import { color } from "../../settings/color";
import { globalCss } from "../../settings/commonCss";
import { font } from "../../settings/font";
import { mediaQueries } from "../../settings/mediaQueries";
import { Content } from "./components/Content";
import { Head } from "./components/Head";

export class Home extends React.Component<{}, { scrollAmount: number }> {

    public constructor(props: {}) {
        super(props);
        this.state = { scrollAmount: 0 };
    }

    private handleScroll = () => {
        if (window) {
            this.setState({ scrollAmount: window.scrollY / window.innerHeight });
        }
    }

    public render() {
        return (
            <React.Fragment>
                <Global
                    styles={{
                        ...this.globalCss as object,
                        ...this.bodyCss() as object,
                    }}
                />
                <EventListener
                    target="window"
                    onScroll={this.handleScroll}
                />
                <Head />
                <Content />
            </React.Fragment>
        );
    }

    private readonly globalCss: InterpolationWithTheme<any> = globalCss;

    private bodyCss(): InterpolationWithTheme<any> {
        return {
            body: {
                ...font.serif,
                backgroundColor: this.state.scrollAmount <= 0
                    ? color.darkBackground
                    : color.lightBackground,
            },
        };
    }
}
