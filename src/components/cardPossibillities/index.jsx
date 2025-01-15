import React from "react";
import Styles from "./cardPossibillities.module.scss";

function cardPossibillities(props) {
    return (
        <div className={Styles.card}>
            <div className={Styles.card__image}>
                <img src={props.icon} />
            </div>
            <div className={Styles.card__title}>{props.title}</div>
            <div className={Styles.card__pretitle}>{props.pretitle}</div>
        </div>
    );
}

export default cardPossibillities;
