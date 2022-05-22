import React from "react";
import { NavLink } from "react-router-dom";

const NavigationItems = () => {
    return (
        <>
            <li>
                <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
                <NavLink to={"blogs"}>Blogs</NavLink>
            </li>
            <li>
                <NavLink to={"portfolio"}>Portfolio</NavLink>
            </li>
        </>
    );
};

export default NavigationItems;
