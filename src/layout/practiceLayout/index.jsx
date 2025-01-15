import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthUser } from "../../redux/slices/authSlices";
import Styles from "./practiceLayout.module.scss";
import Sidebar from "../../components/sidebar";

function practiceLayout() {
    const isAuth = useSelector(isAuthUser);
    const sidebarList = {
        "Начало работы": [
            { title: "Правило Хебба", shortUrl: "hebba", category: "Начало работы" },
            { title: "Дельта-правило", shortUrl: "delta", category: "Начало работы" },
        ],
    };

    return isAuth ? (
        <main className={Styles.main}>
            <div className={Styles.container}>
                <div className={Styles.main__content}>
                    <Sidebar list={sidebarList} url="/practice" isTools={false} />
                    <Outlet className={Styles.content} />
                </div>
            </div>
        </main>
    ) : (
        <Navigate to="/login" />
    );
}

export default practiceLayout;
