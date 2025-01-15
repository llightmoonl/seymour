import React from "react";
import Styles from "./informationBlock.module.scss";
import Tooltip from "../ui/Tooltip";
import Button from "../ui/Button";
import { Info } from "lucide-react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";

function informationBlock(props) {
    return (
        <div className={Styles.information__block}>
            <div className={Styles.information__title}>
                <div className={Styles.information__text}>{props.title}</div>
                {props.isTooltip ? (
                    <Tooltip
                        content={
                            <Markdown
                                rehypePlugins={[[rehypeKatex, { output: "mathml" }], [rehypeRaw]]}
                                remarkPlugins={[remarkMath]}
                            >
                                {props.tooltipText}
                            </Markdown>
                        }
                    >
                        <Button variant="ghost" size="icon">
                            <Info />
                        </Button>
                    </Tooltip>
                ) : (
                    ""
                )}
            </div>
            <div className={Styles.information__value}>
                {props.isVariable ? `${props.variable} = ` : ""}
                {props.isValue ? props.value : ""}
            </div>
        </div>
    );
}

export default informationBlock;
