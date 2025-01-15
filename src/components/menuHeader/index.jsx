import React from "react";
import { useLocation, Link } from "react-router-dom";

import styles from "./menuHeader.module.scss";

function menuHeader(props) {
    const location = useLocation();
    return (
        <nav className={styles.menu}>
            {props.list.map((value, index) => (
                <div
                    key={index}
                    className={
                        location.pathname.split("/")[1] === value.location
                            ? `${styles.menu__element} ${styles.menu__element__active}`
                            : styles.menu__element
                    }
                >
                    <Link to={value.link}>{value.title}</Link>
                </div>
            ))}
        </nav>
    );
}

export default menuHeader;
