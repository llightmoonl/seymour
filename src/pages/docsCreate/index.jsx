import React from "react";
import axios from "../../axios";

import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/docsSlices";
import { isAuthUser } from "../../redux/slices/authSlices";

import Editor from "../../components/editor";
import Input from "../../components/input";
import SelectInput from "../../components/selectInput";
import Button from "../../components/ui/Button";

import Styles from "./docsCreate.module.scss";

function docsCreate() {
    const isAuth = useSelector(isAuthUser);
    const { data } = useSelector((state) => state.auth);
    const [title, setTitle] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [category, setCategory] = React.useState("");
    const { categories } = useSelector((state) => state.docs);
    const [text, setText] = React.useState("");
    const [error, setError] = React.useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (isAuth) {
        if (data.user.role !== "Администратор") {
            return <Navigate to="/docs/start" />;
        }
    } else {
        return <Navigate to="/docs/start" />;
    }

    const onSubmit = () => {
        axios
            .post("/docs/", {
                title: title,
                shortUrl: url,
                category: category,
                text: text,
            })
            .then(() => {
                navigate(`/docs/${url}`);
                window.location.reload();
            })
            .catch((err) => {
                const errors = {};

                err.response.data.message.map((value) => {
                    errors[value.path] = value.msg;
                });

                setError(errors);
            });
    };

    React.useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    return (
        <div className={Styles.create}>
            <Button
                variant="link"
                className={Styles.back}
                onClick={() => {
                    navigate("/docs");
                }}
            >
                ← Назад
            </Button>
            <h1 className={Styles.title}>Создание новой страницы</h1>
            <div className={Styles.inputs}>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    title="Название страницы"
                    error={error.title}
                />
                <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    type="text"
                    title="Короткий адрес страницы"
                    error={error.shortUrl}
                />
                <SelectInput
                    value={category}
                    setValue={setCategory}
                    type="text"
                    title="Категория страницы"
                    error={error.category}
                    data={categories.items.data}
                />
                <Editor value={text} onChange={setText} title="Текст страницы" error={error.text} />
            </div>
            <div className={Styles.controller}>
                <Button
                    variant="link"
                    className={Styles.controller__back}
                    onClick={() => {
                        navigate("/docs");
                    }}
                >
                    Назад
                </Button>
                <Button className={Styles.controller__publish} onClick={onSubmit}>
                    Опубликовать
                </Button>
            </div>
        </div>
    );
}

export default docsCreate;
