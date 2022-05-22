import React from "react";
import Logo from "../../../Logo/Logo";
import NavigationItems from "../Shared/NavigationItems/NavigationItems";

const SideDrawer = () => {
    return (
        <div className="drawer-side">
            <label htmlFor="side-drawer" className="drawer-overlay"></label>

            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
                <Logo className="text-2xl lg:text-3xl mb-4" />
                {/* <!-- Sidebar content here --> */}
                <NavigationItems />
            </ul>
        </div>
    );
};

export default SideDrawer;
