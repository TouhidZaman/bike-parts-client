import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../../../firebase/firebase.init";
import useAdmin from "../../../../hooks/useAdmin";
import Spinner from "../../../UI/Spinner/Spinner";

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin, loading] = useAdmin(user);

    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* <!-- Page content here --> */}
                {/* <h3 className="text-center text-primary text-3xl lg:my-4">
                    Welcome to your Dashboard
                </h3> */}
                <Outlet />
                {/* <label
                    htmlFor="my-drawer-2"
                    className="btn btn-primary drawer-button lg:hidden"
                >
                    Open drawer
                </label> */}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu py-4 lg:pt-16 overflow-y-auto w-60 bg-base-200 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li className="border-b border-primary">
                        <Link to={"/dashboard"}>My Profile</Link>
                    </li>
                    {admin ? (
                        <>
                            <li className="border-b border-primary">
                                <Link to={"add-product"}>Add Product</Link>
                            </li>
                            <li className="border-b border-primary">
                                <Link to={"manage-products"}>Manage Products</Link>
                            </li>
                            <li className="border-b border-primary">
                                <Link to={"manage-orders"}>Manage Orders</Link>
                            </li>
                            <li className="border-b border-primary">
                                <Link to={"manage-users"}>Manage Users</Link>
                            </li>
                        </>
                    ) : !loading ? (
                        <>
                            <li className="border-b border-primary">
                                <Link to={"my-orders"}>My Orders</Link>
                            </li>
                            <li className="border-b border-primary">
                                <Link to={"add-review"}>Add Review</Link>
                            </li>
                        </>
                    ) : (
                        <Spinner containerClass="" spinnerSize={'200px'}/>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
