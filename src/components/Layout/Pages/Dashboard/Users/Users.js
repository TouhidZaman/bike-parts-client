import React from "react";
import axiosInstance from "../../../../../api/axiosInstance";
import { useQuery } from "react-query";
import UserRow from "./UserRow/UserRow";

const Users = () => {
    const {
        isLoading,
        error,
        data: users,
        refetch,
    } = useQuery("users", () =>
        axiosInstance(`users`).then((response) => response.data)
    );

    if (isLoading) return "Loading...";

    if (error) {
        return `Error: ${error.message}`;
    }
    return (
        <div className="overflow-x-auto px-12">
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
    );
};

export default Users;
