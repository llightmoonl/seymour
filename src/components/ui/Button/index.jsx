import React from "react";
import cn from "clsx";
import Styles from "./button.module.scss";

export default function Button({ children, variant = "primary", size = "default", ...rest }) {
    return (
        <button
            {...rest}
            className={cn(
                Styles.button,
                {
                    [Styles.secondary]: variant === "secondary",
                    [Styles.link]: variant === "link",
                    [Styles.ghost]: variant === "ghost",
                },
                {
                    [Styles.icon]: size === "icon",
                },
                rest.className
            )}
        >
            {children}
        </button>
    );
}
