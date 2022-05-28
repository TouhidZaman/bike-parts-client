import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Layout/Pages/Auth/Login/Login";
import ResetPassword from "./components/Layout/Pages/Auth/ResetPassword/ResetPassword";
import Signup from "./components/Layout/Pages/Auth/Signup/Signup";
import Blogs from "./components/Layout/Pages/Blogs/Blogs";
import AddProduct from "./components/Layout/Pages/Dashboard/AddProduct/AddProduct";
import Dashboard from "./components/Layout/Pages/Dashboard/Dashboard";
import ManageOrders from "./components/Layout/Pages/Dashboard/ManageOrders/ManageOrders";
import ManageProducts from "./components/Layout/Pages/Dashboard/ManageProducts/ManageProducts";
import ManageUsers from "./components/Layout/Pages/Dashboard/ManageUsers/ManageUsers";
import MyProfile from "./components/Layout/Pages/Dashboard/MyProfile/MyProfile";
import AddReview from "./components/Layout/Pages/Dashboard/AddReview/AddReview";
import Home from "./components/Layout/Pages/Home/Home";
import NotFound from "./components/Layout/Pages/NotFound/NotFound";
import Portfolio from "./components/Layout/Pages/Portfolio/Portfolio";
import RequireAdmin from "./components/Layout/Pages/RequireAdmin";
import RequireAuth from "./components/Layout/Pages/RequireAuth";
import MyOrders from "./components/Layout/Pages/Dashboard/MyOrders/MyOrders";
import EditProfile from "./components/Layout/Pages/Dashboard/MyProfile/EditProfile/EditProfile";
import Purchase from "./components/Layout/Pages/Purchase/Purchase";
import MakePayment from "./components/Layout/Pages/Dashboard/MyOrders/MakePayment/MakePayment";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<Signup />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route
                path="purchase/:productId"
                element={
                    <RequireAuth>
                        <Purchase />
                    </RequireAuth>
                }
            />
            <Route
                path="dashboard"
                element={
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>
                }
            >
                {/* Common routes */}
                <Route index element={<MyProfile />} />
                <Route path="edit-profile/:email" element={<EditProfile />} />

                {/* User Routes  */}
                <Route path="my-orders" element={<MyOrders />} />
                <Route path="add-review" element={<AddReview />} />
                <Route path="payment/:orderId" element={<MakePayment />} />

                {/* Admin Routes  */}
                <Route
                    path="add-product"
                    element={
                        <RequireAdmin>
                            <AddProduct />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="manage-products"
                    element={
                        <RequireAdmin>
                            <ManageProducts />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="manage-orders"
                    element={
                        <RequireAdmin>
                            <ManageOrders />
                        </RequireAdmin>
                    }
                />
                <Route
                    path="manage-users"
                    element={
                        <RequireAdmin>
                            <ManageUsers />
                        </RequireAdmin>
                    }
                />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
