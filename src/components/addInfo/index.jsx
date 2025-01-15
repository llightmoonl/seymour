import React from "react";
import Styles from "./addInfo.module.scss";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
function addInfo(props) {
    const [isHoverInfo, setIsHoverInfo] = React.useState(false);

    return (
        <div
            className={Styles.addInfo}
            onMouseOver={() => setIsHoverInfo(true)}
            onMouseOut={() => setIsHoverInfo(false)}
        >
            <div className={Styles.addInfo__icon}>
                <svg className={Styles.addInfo__svg}>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="16" y2="12" />
                    <line x1="12" x2="12.01" y1="8" y2="8" />
                </svg>
            </div>
            {isHoverInfo ? (
                <div className={Styles.addInfo__block}>
                    <div className={Styles.addInfo__content}>
                        <Markdown
                            className={Styles.addInfo__text}
                            rehypePlugins={[[rehypeKatex, { output: "mathml" }], [rehypeRaw]]}
                            remarkPlugins={[remarkMath]}
                        >
                            {props.information}
                        </Markdown>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default addInfo;
