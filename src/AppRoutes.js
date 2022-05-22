import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Layout/Pages/Auth/Login/Login";
import Signup from "./components/Layout/Pages/Auth/Signup/Signup";
import Blogs from "./components/Layout/Pages/Blogs/Blogs";
import Home from "./components/Layout/Pages/Home/Home";
import NotFound from "./components/Layout/Pages/NotFound/NotFound";
import Portfolio from "./components/Layout/Pages/Portfolio/Portfolio";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
