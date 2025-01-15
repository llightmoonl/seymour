import React from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";

import Styles from "./content.module.scss";

function content(props) {
    const navigate = useNavigate();

    return (
        <div className={Styles.content}>
            <h1 className={Styles.content__title}>{props.title}</h1>
            <div className={Styles.content__text}>
                <Markdown
                    rehypePlugins={[[rehypeKatex, { output: "mathml" }], [rehypeRaw]]}
                    remarkPlugins={[remarkMath]}
                >
                    {props.text}
                </Markdown>
            </div>
            <Button variant="link" className={Styles.content__edit} onClick={() => navigate("/edit")}>
                Редактировать страницу
            </Button>
        </div>
    );
}

export default content;
