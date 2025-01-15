import React from "react";
import cn from "clsx";
import Styles from "./loginPage.module.scss";
import Input from "../../components/input";
import Button from "../../components/ui/Button";
import Checkbox from "../../components/checkbox";
import ErrorInput from "../../components/errorInput";
import Logo from "../../components/logo";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin, isAuthUser } from "../../redux/slices/authSlices";
import { useNavigate, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function loginPage() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState([]);
    const isAuth = useSelector(isAuthUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = () => {
        dispatch(fetchLogin({ email, password }))
            .unwrap()
            .then((value) => {
                if (value.user.token) {
                    window.localStorage.setItem("token", value.user.token);
                } else {
                    console.log("Не удалось авторизоваться");
                }
            })
            .catch((errorValue) => {
                const errors = {};

                errorValue.map((value) => {
                    errors[value.path] = value.msg;
                });

                setError(errors);
            });
    };

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <div className={Styles.login}>
            <div className={Styles.container}>
                <div className={Styles.login__content}>
                    <div className={Styles.login__form}>
                        <div className={Styles.login__header}>
                            <div className={Styles.login__back}>
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
                            <div className={Styles.login__logo}>
                                <Logo className={Styles.logo} title="Seymour" />
                            </div>
                        </div>
                        <div className={Styles.login__controllers}>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                title="Логин или email"
                            />
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                title="Пароль"
                            />
                            <ErrorInput className={Styles.login__error} title={error.email || error.password} />
                            <Checkbox
                                checked={showPassword}
                                onChange={() => {
                                    setShowPassword(!showPassword);
                                }}
                                text="Показать пароль"
                            />
                            <Button className={cn(Styles.button, Styles.button__login)} onClick={onSubmit}>
                                Войти
                            </Button>
                            <Button
                                variant="secondary"
                                className={cn(Styles.button, Styles.button__register)}
                                onClick={() => {
                                    navigate("/register");
                                }}
                            >
                                Создать аккаунт
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default loginPage;
