import React from "react";
import { useSelector } from "react-redux";

import ProfileCard from "../../components/profileCard";

import Styles from "./profilePage.module.scss";
import ProgressBlock from "../../components/progressBlock";

function profilePage() {
    const { data } = useSelector((state) => state.auth);
    const progressList = [
        { title: "Правило Хебба", percent: 0, link: "/practice/hebba" },
        { title: "Дельта-правило", percent: 100, link: "/practice/delta" },
    ];
    return (
        <div className={Styles.container}>
            <ProfileCard
                className={Styles.profile}
                firstName={data.user.firstName}
                lastName={data.user.lastName}
                nickname={data.user.shortUrl}
                src={data.user.avatarUrl}
            />
            <div className={Styles.progress}>
                <div className={Styles.progress__top}>
                    <h1 className={Styles.progress__title}>Прогресс</h1>
                    <div className={Styles.progress__navigation}></div>
                </div>
                <div className={Styles.progress__content}>
                    {progressList.map((value, index) => (
                        <ProgressBlock
                            className={Styles.progress__element}
                            key={index}
                            title={value.title}
                            percent={value.percent}
                            link={value.link}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default profilePage;
