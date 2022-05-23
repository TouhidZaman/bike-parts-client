import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";
import auth from "../../../../../firebase/firebase.init";

const NavigationItems = () => {
    const [user] = useAuthState(auth);
    const logOut = () => {
        signOut(auth);
        localStorage.removeItem("accessToken");
    };

    return (
        <>
            <li>
                <NavLink to={"/"}>Home</NavLink>
            </li>
            {user && (
                <li>
                    <NavLink to={"dashboard"}>Dashboard</NavLink>
                </li>
            )}
            <li>
                <NavLink to={"blogs"}>Blogs</NavLink>
            </li>
            <li>
                <NavLink to={"portfolio"}>Portfolio</NavLink>
            </li>
            {user ? (
                <li>
                    <NavLink onClick={logOut} to={"/login"}>
                        Sign-Out
                    </NavLink>
                </li>
            ) : (
                <>
                    <li>
                        <NavLink to={"/login"}>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/sign-up"}>Sign-Up</NavLink>
                    </li>
                </>
            )}
        </>
    );
};

export default NavigationItems;
