import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import axiosInstance from "../../../../../api/axiosInstance";
import auth from "../../../../../firebase/firebase.init";
import DeleteConfirmModal from "../../../../UI/Spinner/DeleteConfirmModal/DeleteConfirmModal";
import Spinner from "../../../../UI/Spinner/Spinner";
import OrderRow from "./OrderRow/OrderRow";

const MyOrders = () => {
    const [authUser, authLoading] = useAuthState(auth);
    const [deleteOrder, setDeleteOrder] = useState(null);

    const {
        isLoading,
        error,
        data: orders,
        refetch,
    } = useQuery(["orders", authUser.email], () =>
        axiosInstance(`my-orders/${authUser?.email}`).then(
            (response) => response.data
        )
    );

    if (isLoading || authLoading)
        return (
            <Spinner
                containerClass="mt-24 flex justify-center"
                spinnerSize={"300px"}
            />
        );

    if (error) {
        return `Error: ${error.message}`;
    }

    //Handle Delete Product
    const handleDeleteOrder = async (role) => {
        // const role = "admin";
        await axiosInstance
            .delete(`orders/${deleteOrder._id}`)
            .then((response) => {
                refetch();
                setDeleteOrder(null);
                Swal.fire({
                    icon: "success",
                    title: `Product deleted successfully`,
                    showConfirmButton: false,
                    timer: 2500,
                });
            })
            .catch((error) => {
                setDeleteOrder(null);
                if (error.response.status === 401 || error.response.status === 403) {
                    Swal.fire({
                        icon: "error",
                        title: `${error.response.status} !`,
                        text: `${error.response.data.message}. Login again to continue`,
                    });
                    // console.log("unauthorized user/access", error.response.status);
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: `Failed to delete product`,
                        showConfirmButton: false,
                        timer: 2500,
                    });
                }
            });
    };

    return (
        <div className="shadow w-11/12 mx-auto p-8 pt-4 text-center my-8">
            <h3 className="text-center text-primary text-3xl mb-4">
                My orders
            </h3>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Payment</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <OrderRow
                                key={order._id}
                                order={order}
                                index={index}
                                setDeleteOrder={setDeleteOrder}
                                refetch={refetch}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            {deleteOrder && (
                <DeleteConfirmModal
                    deleteButtonClicked={handleDeleteOrder}
                    title={deleteOrder.product}
                />
            )}
        </div>
    );
};

export default MyOrders;
