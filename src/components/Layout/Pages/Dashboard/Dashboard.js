import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../../../firebase/firebase.init";
import useAdmin from "../../../../hooks/useAdmin";

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);

    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* <!-- Page content here --> */}
                <h3 className="text-center text-primary text-3xl lg:my-4">
                    Welcome to your Dashboard
                </h3>
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
                        <Link to={"/dashboard"}>Profile</Link>
                    </li>
                    {admin && (
                        <li className="border-b border-primary">
                            <Link to={"users"}>All Users</Link>
                        </li>
                    )}
                    <li className="border-b border-primary">
                        <Link to={"reviews"}>My Reviews</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
