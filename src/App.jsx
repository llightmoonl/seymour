import React from "react";
import Header from "./components/shared/header";
import { Routes, Route, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, isAuthUser } from "./redux/slices/authSlices";
import MainPage from "./pages/mainPage";
import DocsPage from "./pages/docsPage";
import DocsLayout from "./layout/docsLayout";
import DocsCreate from "./pages/docsCreate";
import PracticeLayout from "./layout/practiceLayout";
import HebbaPage from "./pages/hebbaPage";
import DeltaPage from "./pages/deltaPage";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import ProfilePage from "./pages/profilePage";

function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthUser);

    React.useEffect(() => {
        dispatch(fetchProfile());
    }, []);

    return (
        <>
            {location.pathname !== "/register" && location.pathname !== "/login" && location.pathname !== "/" ? (
                <Header transparent={false} />
            ) : (
                ""
            )}
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/docs" element={<DocsLayout />}>
                    <Route path="" element={<DocsPage />} />
                    <Route path=":shortUrl" element={<DocsPage />} />
                    <Route path="create" element={<DocsCreate />} />
                </Route>
                <Route path="/practice" element={<PracticeLayout />}>
                    <Route path="hebba" element={<HebbaPage />} />
                    <Route path="delta" element={<DeltaPage />} />
                </Route>

                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </>
    );
}

export default App;
