import React from "react";
import Styles from "./registerPage.module.scss";
import cn from "clsx";
import Input from "../../components/input";
import Button from "../../components/ui/Button";
import Checkbox from "../../components/checkbox";
import Logo from "../../components/logo";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, isAuthUser } from "../../redux/slices/authSlices";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function registerPage() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [shortUrl, setShortUrl] = React.useState("");
    const [error, setError] = React.useState([]);

    const isAuth = useSelector(isAuthUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = () => {
        dispatch(fetchRegister({ firstName, lastName, email, password, shortUrl }))
            .unwrap()
            .then((value) => {
                console.log(value.user);
                if (value.user.token) {
                    window.localStorage.setItem("token", value.user.token);
                } else {
                    console.log("Не удалось авторизоваться");
                }
            })
            .catch((errorValue) => {
                const errors = {};
                console.log(errorValue);

                errorValue.map((err) => {
                    errors[err.path] = err.msg;
                });

                setError(errors);
            });
    };
    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <div className={Styles.register}>
            <div className={Styles.container}>
                <div className={Styles.register__content}>
                    <div className={Styles.register__form}>
                        <div className={Styles.register__header}>
                            <div className={Styles.register__back}>
                                <Button
                                    className={Styles.button__back}
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        navigate("/");
                                    }}
                                >
                                    <ArrowLeft className={Styles.icon__back} />
                                </Button>
                            </div>
                            <div className={Styles.register__logo}>
                                <Logo className={Styles.logo} title="Seymour" />
                            </div>
                        </div>
                        <h1 className={Styles.register__title}>Введите свои данные</h1>
                        <div className={Styles.register__controllers}>
                            <Input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                type="text"
                                title="Имя"
                                error={error.firstName}
                            />
                            <Input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                type="text"
                                title="Фамилия"
                                error={error.lastName}
                            />
                            <Input
                                value={shortUrl}
                                onChange={(e) => setShortUrl(e.target.value)}
                                type="text"
                                title="Придумайте логин"
                                error={error.shortUrl}
                            />
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                title="Эл.почта"
                                error={error.email}
                            />

                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                title="Пароль"
                                error={error.password}
                            />
                            <Checkbox
                                checked={showPassword}
                                onChange={() => {
                                    setShowPassword(!showPassword);
                                }}
                                text="Показать пароль"
                            />
                            <Button className={cn(Styles.button, Styles.button__register)} onClick={onSubmit}>
                                Зарегистрироваться
                            </Button>
                            <Button
                                className={Styles.button__login}
                                variant="link"
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                Уже есть аккаунт
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default registerPage;
