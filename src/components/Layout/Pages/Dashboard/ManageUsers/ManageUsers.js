import React from "react";
import axiosInstance from "../../../../../api/axiosInstance";
import { useQuery } from "react-query";
import UserRow from "./UserRow/UserRow";
import Spinner from "../../../../UI/Spinner/Spinner";

const ManageUsers = () => {
    const {
        isLoading,
        error,
        data: users,
        refetch,
    } = useQuery("users", () =>
        axiosInstance(`users`).then((response) => response.data)
    );

    if (isLoading)
        return (
            <Spinner
                containerClass="mt-24 flex justify-center"
                spinnerSize={"300px"}
            />
        );

    if (error) {
        return `Error: ${error.message}`;
    }
    return (
        <div className="shadow w-11/12 mx-auto p-8 pt-4 text-center my-8">
            <h3 className="text-center text-primary text-3xl mb-4">
                Manage All Users
            </h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>User info</th>
                            <th>Promote</th>
                            <th>Remove user</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => (
                            <UserRow
                                key={user._id}
                                user={user}
                                index={index}
                                refetch={refetch}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
