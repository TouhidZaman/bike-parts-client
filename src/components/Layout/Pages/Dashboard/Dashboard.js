import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div class="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col items-center">
                {/* <!-- Page content here --> */}
                <h3 className="text-center text-primary text-3xl lg:mt-10">
                    Welcome to your Dashboard
                </h3>
                <Outlet />
                {/* <label
                    for="my-drawer-2"
                    class="btn btn-primary drawer-button lg:hidden"
                >
                    Open drawer
                </label> */}
            </div>
            <div class="drawer-side">
                <label for="my-drawer-2" class="drawer-overlay"></label>
                <ul class="menu py-4 lg:pt-10 overflow-y-auto w-60 bg-base-200 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li className="border-b border-primary">
                        <Link to={'/dashboard'}>Users</Link>
                    </li>
                    <li className="border-b border-primary">
                        <Link to={'profile'}>My Profile</Link>
                    </li>
                    <li className="border-b border-primary">
                        <Link to={'reviews'}>My Reviews</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
