import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocDelete } from "../../redux/slices/docsSlices";
import { isAuthUser } from "../../redux/slices/authSlices";

import { Link, useNavigate } from "react-router-dom";
import Styles from "./sidebarElement.module.scss";

function sidebarElement(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthUser);
    const { data } = useSelector((state) => state.auth);

    const deleteOnSubmit = (url) => {
        dispatch(fetchDocDelete(url));
        navigate(props.url);
    };

    return (
        <div className={Styles.sidebar__content}>
            <div className={Styles.sidebar__title}>{props.title}</div>
            <ul className={Styles.sidebar__list}>
                {props.list.map((value, id) => (
                    <li key={id} className={Styles.sidebar__element}>
                        <Link
                            title={value.title}
                            to={value.shortUrl ? `${props.url}/${value.shortUrl}` : `${props.url}`}
                        >
                            {value.title}
                        </Link>
                        {props.isTools && isAuth && data.user.role === "Администратор" ? (
                            <div className={Styles.sidebar__controller}>
                                <svg className={Styles.edit} viewBox="0 0 18 18">
                                    <title />
                                    <desc />
                                    <defs />
                                    <g fill="none" id="Page-1">
                                        <g id="Core" transform="translate(-213.000000, -129.000000)">
                                            <g id="create" transform="translate(213.000000, 129.000000)">
                                                <path
                                                    d="M0,14.2 L0,18 L3.8,18 L14.8,6.9 L11,3.1 L0,14.2 L0,14.2 Z M17.7,4 C18.1,3.6 18.1,3 17.7,2.6 L15.4,0.3 C15,-0.1 14.4,-0.1 14,0.3 L12.2,2.1 L16,5.9 L17.7,4 L17.7,4 Z"
                                                    id="Shape"
                                                />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <svg
                                    onClick={() => deleteOnSubmit(value.shortUrl)}
                                    className={Styles.delete}
                                    viewBox="0 0 448 512"
                                >
                                    <path d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z" />
                                </svg>
                            </div>
                        ) : (
                            ""
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default sidebarElement;
