import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import axiosInstance from "../../../../../api/axiosInstance";
import auth from "../../../../../firebase/firebase.init";
import Spinner from "../../../../UI/Spinner/Spinner";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyProfile = () => {
    const [authUser, loading] = useAuthState(auth);

    const {
        isLoading,
        data: user,
    } = useQuery(["user", authUser.email], () =>
        axiosInstance(`users/${authUser.email}`).then((response) => response.data)
    );

    //Handling Loading state
    if (loading || isLoading) {
        return (
            <Spinner
                containerClass="mt-24 flex justify-center"
                spinnerSize={"300px"}
            />
        );
    }

    return (
        <div className="shadow w-11/12 mx-auto p-8 text-center my-8">
            <div className="overflow-x-auto">
                <div></div>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <Link
                                    to={`edit-profile/${user.email}`}
                                    className="btn btn-link absolute right-2 top-2 text-warning hover:text-success"
                                >
                                    <FaEdit className="text-xl mr-1" />
                                    <span className="">Edit Profile</span>
                                </Link>
                                <div className="avatar">
                                    <div className="rounded-full w-32">
                                        <img
                                            src={
                                                user.image ||
                                                "https://api.lorem.space/image/face?hash=92310"
                                            }
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-lg">
                        <tr>
                            <td>
                                <span className="text-primary">Name: </span>
                                {user.name}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="text-primary">Email: </span>
                                {user.email}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="text-primary">Phone: </span>
                                {user.phone ? (
                                    user.phone
                                ) : (
                                    <span className="text-warning">
                                        This field is empty
                                    </span>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="text-primary">Education: </span>
                                {user.education ? (
                                    user.education
                                ) : (
                                    <span className="text-warning">
                                        This field is empty
                                    </span>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="text-primary">Address: </span>
                                {user.address ? (
                                    user.address
                                ) : (
                                    <span className="text-warning">
                                        This field is empty
                                    </span>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="text-primary">LinkedIn: </span>
                                {user.linkedIn ? (
                                    user.linkedIn
                                ) : (
                                    <span className="text-warning">
                                        This field is empty
                                    </span>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProfile;
