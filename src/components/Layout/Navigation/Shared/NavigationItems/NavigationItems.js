import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink } from "react-router-dom";
import auth from "../../../../../firebase/firebase.init";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineReviews } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const NavigationItems = () => {
    const [user] = useAuthState(auth);
    const logOut = () => {
        signOut(auth);
        localStorage.removeItem("accessToken");
    };
    console.log(user);
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
                <div class="dropdown dropdown-hover dropdown-start lg:dropdown-end">
                    <label tabIndex="0" class="btn btn-ghost avatar">
                        <div className="w-10 rounded-full">
                            <img
                                src={
                                    user.photoURL ||
                                    "https://api.lorem.space/image/face?hash=3174"
                                }
                                alt="user"
                            />
                        </div>
                    </label>
                    <ul
                        tabIndex="0"
                        class="dropdown-content p-4 menu shadow bg-accent text-white rounded-box w-64"
                    >
                        <div className="text-center">
                            <div class="avatar">
                                <div class="w-24 rounded-full">
                                    <img
                                        src={
                                            user.photoURL ||
                                            "https://api.lorem.space/image/face?hash=3174"
                                        }
                                        alt=""
                                    />
                                </div>
                            </div>
                            <h4 className="text-xl mb-2">{user?.displayName}</h4>
                        </div>
                        <div className="w-full border-b border-b-primary"></div>
                        <li className="">
                            <Link className="w-full" to={"/dashboard"}>
                                <CgProfile lassName="font-bold text-xl" />
                                My Profile
                            </Link>
                        </li>
                        <li className="">
                            <Link className="w-full" to={"/dashboard/reviews"}>
                                <MdOutlineReviews className="font-bold text-xl" />
                                My Reviews
                            </Link>
                        </li>
                        <li className="">
                            <Link className="w-full" onClick={logOut} to={"login"}>
                                <FiLogOut className="font-bold text-xl" /> Logout
                            </Link>
                        </li>
                    </ul>
                </div>
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
