import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";

import SidebarElement from "../sidebarElement";
import { isAuthUser } from "../../redux/slices/authSlices";

import Styles from "./sidebar.module.scss";

function sidebar(props) {
    const isAuth = useSelector(isAuthUser);
    const { data } = useSelector((state) => state.auth);
    const location = useLocation();

    return (
        <div className={Styles.sidebar}>
            <div className={Styles.sidebar__groups}>
                {Object.keys(props.list).map((value, index) => (
                    <SidebarElement
                        key={index}
                        title={value}
                        list={props.list[value]}
                        url={props.url}
                        isTools={props.isTools}
                    />
                ))}
            </div>
            {props.isCreate &&
            location.pathname !== `${props.url}/create` &&
            isAuth &&
            data.user.role === "Администратор" ? (
                <div className={Styles.sidebar__add}>
                    <Link to="create">
                        <svg viewBox="0 0 32 32">
                            <path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z" />
                        </svg>
                        <div className={Styles.link__text}>Добавить страницу</div>
                    </Link>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default sidebar;
