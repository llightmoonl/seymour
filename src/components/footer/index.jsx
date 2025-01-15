import React from "react";
import Styles from "./footer.module.scss";
import { Link } from "react-router-dom";

function footer(props) {
    return (
        <footer className={props.className ? `${Styles.footer} ${props.className}` : Styles.footer}>
            <div className={Styles.container}>
                <div className={Styles.footer__copyright}>
                    <div className={Styles.footer__icon}>©</div>
                    <div className={Styles.footer__year}>{new Date().getFullYear()}</div>
                    <div className={Styles.footer__designed}>Designed by</div>
                    <Link target="_blank" className={Styles.footer__author} to="https://github.com/llightmoonl">
                        {props.author}
                    </Link>
                    <div className={Styles.footer__heart}>
                        <img src="/pixelHeart.svg" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default footer;
