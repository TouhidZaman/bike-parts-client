import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../../api/axiosInstance";

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            await axiosInstance.get("users").then((response) => {
                setUsers(response.data);
            });
        };
        getUsers();
    }, []);
    return <div>All users: {users.length}</div>;
};

export default Users;
