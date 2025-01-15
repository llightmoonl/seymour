import React from "react";
import { useNavigate } from "react-router-dom";

import Styles from "./banner.module.scss";

import Button from "../ui/Button";
import Header from "../shared/header";

function banner(props) {
    const navigate = useNavigate();
    return (
        <div style={{ backgroundImage: `url(${props.image}` }} className={Styles.banner}>
            <Header transparent={true} />
            <div className={Styles.container}>
                <div className={Styles.banner__content}>
                    <div className={Styles.banner__information}>
                        <div className={Styles.banner__title}>{props.title}</div>
                        <div className={Styles.banner__pretitle}>{props.pretitle}</div>
                        <Button
                            className={Styles.banner__button}
                            onClick={() => {
                                navigate(props.onClick);
                            }}
                        >
                            Узнать больше
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default banner;
