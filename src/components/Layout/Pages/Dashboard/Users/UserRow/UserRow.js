import React from "react";

const UserRow = ({ user, index, refetch }) => {
    const { email } = user;

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{email}</td>
            <td>
                <button className="btn btn-xs btn-info text-white">Make Admin</button>
            </td>
            <td>
                <button className="btn btn-xs btn-error text-white">Delete</button>
            </td>
        </tr>
    );
};

export default UserRow;
