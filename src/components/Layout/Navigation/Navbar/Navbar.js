import React from "react";
import Logo from "../../../Logo/Logo";
import NavigationItems from "../Shared/NavigationItems/NavigationItems";

const Navbar = () => {
    return (
        <nav className="w-full lg:px-8 navbar bg-accent fixed top-0 z-20">
            <div className="flex-1 px-2 mx-2">
                <Logo className="text-2xl lg:text-3xl" />
            </div>
            <div className="flex-none lg:hidden">
                <label htmlFor="side-drawer" className="btn btn-square btn-ghost text-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-6 h-6 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </label>
            </div>
            <div className="flex-none hidden lg:block">
                <ul className="menu menu-horizontal p-0 text-white">
                    {/* <!-- Navbar menu content here --> */}
                    <NavigationItems />
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
