import React from "react";
import Styles from "./progressBlock.module.scss";
import { Link } from "react-router-dom";

function progressBlock(props) {
    return (
        <Link
            className={
                props.className ? `${Styles.progressBlock__link} ${props.className}` : Styles.progressBlock__link
            }
            to={props.link}
        >
            <div className={Styles.progressBlock__button}>
                <img src="/Arrow.svg" />
            </div>
            <div className={Styles.progressBlock}>
                <div className={Styles.progressBlock__title}>{props.title}</div>
                <div className={Styles.progressBlock__percent}>
                    {props.percent}
                    <div className={Styles.percent__icon}>%</div>
                </div>
            </div>
        </Link>
    );
}

export default progressBlock;
