import React from "react";
import Styles from "./progress.module.scss";
function progress(props) {
    return (
        <div className={Styles.progress}>
            <div className={Styles.progress__title}>{props.title}</div>
            <div className={Styles.progress__slider}></div>
        </div>
    );
}

export default progress;
