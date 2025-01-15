import React from "react";

import Styles from "./header.module.scss";

import Logo from "../../logo";
import ProfileHeader from "../../profileHeader";
import MenuHeader from "../../menuHeader";
import Button from "../../ui/Button";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthUser } from "../../../redux/slices/authSlices";

function Header(props) {
    const menuList = [
        { title: "Главная", link: "/", location: "" },
        { title: "Документация", link: "/docs/start", location: "docs" },
        { title: "Практика", link: "/practice/hebba", location: "practice" },
    ];

    const isAuth = useSelector(isAuthUser);
    const navigate = useNavigate();

    return (
        <header className={props.transparent ? `${Styles.header} ${Styles.header__transparent}` : Styles.header}>
            <div className={Styles.container}>
                <div className={Styles.header__main}>
                    <div className={Styles.header__logo}>
                        <Logo className={Styles.logo} title="Seymour" />
                    </div>

                    <div className={Styles.header__menu}>
                        <MenuHeader list={menuList} />
                    </div>

                    <div className={Styles.header__tools}>
                        {isAuth ? (
                            <ProfileHeader />
                        ) : (
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                Войти
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
