import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import axios from "../../axios";

import Sidebar from "../../components/sidebar";
import Styles from "./docsLayout.module.scss";

function docsLayout() {
    const [sidebarList, setSidebarList] = React.useState({});

    React.useEffect(() => {
        axios
            .get("/docs")
            .then((res) => {
                setSidebarList(Object.groupBy(res.data.data, ({ category }) => category));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <main className={Styles.main}>
            <div className={Styles.container}>
                <div className={Styles.main__content}>
                    <Sidebar list={sidebarList} url="/docs" isCreate={true} isTools={true} />
                    <Outlet className={Styles.content} />
                </div>
            </div>
        </main>
    );
}

export default docsLayout;
