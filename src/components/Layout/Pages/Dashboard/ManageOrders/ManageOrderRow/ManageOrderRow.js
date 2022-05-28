import React from "react";

const ManageOrderRow = ({ order, index, setDeleteOrder, refetch }) => {
    const { phone, quantity, address, image, payment } = order;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={image} alt="product" />
                        </div>
                    </div>
                    {/* <div>
                        <div className="font-bold">{product}</div>
                    </div> */}
                </div>
            </td>
            <td>{quantity}</td>
            <td>{address}</td>
            <td>{phone}</td>
            <td>
                {payment ? (
                    <span className="text-success font-bold">Paid</span>
                ) : (
                    <span className="text-warning font-bold">Pending</span>
                )}
            </td>
            <th>
                {payment ? (
                    <button
                        onClick={() => alert("Order shifted successfully")}
                        className="btn btn-xs bg-success text-white"
                    >
                        shift order
                        {/* <BsTrash className="hover:text-red-400 text-xl text-warning" /> */}
                    </button>
                ) : (
                    <label
                        htmlFor="delete-confirm-modal"
                        onClick={() => setDeleteOrder(order)}
                        className="btn btn-xs bg-warning text-white"
                    >
                        Cancel Order
                        {/* <BsTrash className="hover:text-red-400 text-xl text-warning" /> */}
                    </label>
                )}
            </th>
        </tr>
    );
};

export default ManageOrderRow;
