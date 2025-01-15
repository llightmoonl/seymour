import React from "react";
import Styles from "./profileCard.module.scss";
import { Link } from "react-router-dom";
import Progress from "../progress";
function profileCard(props) {
    return (
        <div className={props.className ? `${Styles.profileCard} ${props.className}` : Styles.profileCard}>
            <div className={Styles.profileCard__avatar}>
                <img src={props.src} />
            </div>
            <div className={Styles.profileCard__information}>
                <div className={Styles.profileCard__top}>
                    <div className={Styles.information__top}>
                        <div className={Styles.profileCard__name}>{`${props.firstName} ${props.lastName}`}</div>
                        <Link to="/settings" className={Styles.profileCard__settings}>
                            <img src="/settings.svg" />
                        </Link>
                    </div>

                    <div className={Styles.profileCard__nickname}>@{props.nickname}</div>
                </div>

                <Progress title="Общий прогресс" />
            </div>
        </div>
    );
}

export default profileCard;
