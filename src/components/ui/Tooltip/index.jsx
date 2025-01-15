import React from "react";
import Styles from "./tooltip.module.scss";
import cn from "clsx";

export default function Tooltip({ children, ...rest }) {
    const [isTooltip, setIsTooltip] = React.useState(false);

    return (
        <div className={Styles.tooltip}>
            <div
                className={Styles.tooltip__trigger}
                onMouseOver={() => setIsTooltip(true)}
                onMouseOut={() => setIsTooltip(false)}
            >
                {children}
            </div>

            {isTooltip ? (
                <div className={cn(Styles.tooltip__block, rest.className)}>
                    <div className={Styles.tooltip__content}>{rest.content}</div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
