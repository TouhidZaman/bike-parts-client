import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Layout/Pages/Auth/Login/Login";
import Signup from "./components/Layout/Pages/Auth/Signup/Signup";
import Blogs from "./components/Layout/Pages/Blogs/Blogs";
import Dashboard from "./components/Layout/Pages/Dashboard/Dashboard";
import MyProfile from "./components/Layout/Pages/Dashboard/MyProfile/MyProfile";
import Reviews from "./components/Layout/Pages/Dashboard/Reviews/Reviews";
import Users from "./components/Layout/Pages/Dashboard/Users/Users";
import Home from "./components/Layout/Pages/Home/Home";
import NotFound from "./components/Layout/Pages/NotFound/NotFound";
import Portfolio from "./components/Layout/Pages/Portfolio/Portfolio";
import RequireAdmin from "./components/Layout/Pages/RequireAdmin";
import RequireAuth from "./components/Layout/Pages/RequireAuth";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<Signup />} />
            <Route
                path="dashboard"
                element={
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>
                }
            >
                <Route index element={<MyProfile />} />
                <Route
                    path="users"
                    element={
                        <RequireAdmin>
                            <Users />
                        </RequireAdmin>
                    }
                />
                <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
