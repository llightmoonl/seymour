import React from "react";
import Styles from "./markdown.module.scss";
import Markdown from "react-markdown";

export default function Markdown({ children, ...rest }) {
    return (
        <Markdown className={Styles.markdown} {...rest}>
            {children}
        </Markdown>
    );
}
