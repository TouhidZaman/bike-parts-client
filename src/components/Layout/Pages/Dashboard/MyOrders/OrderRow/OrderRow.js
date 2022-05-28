import React from "react";
import { Link } from "react-router-dom";
// import { BsTrash } from "react-icons/bs";

const OrderRow = ({ order, index, setDeleteOrder, refetch }) => {
    const { product, price, quantity, image, payment } = order;

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
                    <div>
                        <div className="font-bold">{product}</div>
                    </div>
                </div>
            </td>
            <td>{quantity}</td>
            <td>{payment ? "Transaction Id": <Link to={`/dashboard/payment/${order._id}`} class="btn btn-xs">Make Payment</Link>}</td>
            <td>{price}</td>
            <th>
                {payment ? (
                    "Shipment Pending"
                ) : (
                    <label
                        htmlFor="delete-confirm-modal"
                        onClick={() => setDeleteOrder(order)}
                        className="btn btn-xs"
                    >
                        Cancel Order
                        {/* <BsTrash className="hover:text-red-400 text-xl text-warning" /> */}
                    </label>
                )}
            </th>
        </tr>
    );
};

export default OrderRow;
