import React from "react";
import { Link } from "react-router-dom";
import Styles from "./cardBlock.module.scss";

function cardBlock(props) {
    return (
        <div className={Styles.card__block}>
            <Link to={props.link}>
                <div className={Styles.card__image}>
                    <img src={props.image} />
                </div>
                <div className={Styles.card__information}>
                    <div className={Styles.card__title}>{props.title}</div>
                    <div className={Styles.card__pretitle}>{props.pretitle}</div>
                </div>
            </Link>
        </div>
    );
}

export default cardBlock;
