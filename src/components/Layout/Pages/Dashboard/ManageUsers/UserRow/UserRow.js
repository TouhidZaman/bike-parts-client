import { signOut } from "firebase/auth";
import React from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../../../../../api/axiosInstance";
import auth from "../../../../../../firebase/firebase.init";

const UserRow = ({ user, index, refetch }) => {
    const { email, role } = user;

    const handleUserRole = async (role) => {
        // const role = "admin";
        await axiosInstance
            .put(`users/admin/${email}`, { role })
            .then((response) => {
                refetch();
                Swal.fire({
                    icon: "success",
                    title: `${email} is ${
                        role === "admin" ? "promoted" : "demoted"
                    } to ${role} successfully`,
                    showConfirmButton: false,
                    timer: 2500,
                });
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    Swal.fire({
                        icon: "error",
                        title: `${error.response.status} !`,
                        text: `${error.response.data.message}. Login again to continue`,
                    });
                    // console.log("unauthorized user/access", error.response.status);
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                }
            });
    };

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{email}</td>
            <td>
                {role !== "admin" ? (
                    <button
                        onClick={() => handleUserRole("admin")}
                        className="btn btn-xs btn-info text-white"
                    >
                        Make Admin
                    </button>
                ) : (
                    <button
                        onClick={() => handleUserRole("user")}
                        className="btn btn-xs btn-warning text-white"
                    >
                        Demote to User
                    </button>
                )}
            </td>
            <td>
                <button className="btn btn-xs btn-warning text-white hover:bg-red-500">Delete</button>
            </td>
        </tr>
    );
};

export default UserRow;
