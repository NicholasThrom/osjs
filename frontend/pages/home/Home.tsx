import { Global, InterpolationWithTheme } from "@emotion/core";
import * as React from "react";
import { globalCss } from "../../settings/commonCss";

export class Home extends React.Component<{}, {}> {

    public constructor(props: {}) {
        super(props);
    }

    public render() {
        return (
            <React.Fragment>
                <Global
                    styles={globalCss}
                />
                <h1>Hello, world!</h1>
            </React.Fragment>
        );
    }
}
