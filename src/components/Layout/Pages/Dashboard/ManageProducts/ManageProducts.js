import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import axiosInstance from "../../../../../api/axiosInstance";
import auth from "../../../../../firebase/firebase.init";
import DeleteConfirmModal from "../../../../UI/Spinner/DeleteConfirmModal/DeleteConfirmModal";
import Spinner from "../../../../UI/Spinner/Spinner";
import ProductRow from "./ProductRow/ProductRow";

const ManageProducts = () => {
    const [deleteProduct, setDeleteProduct] = useState(null);
    const {
        isLoading,
        error,
        data: products,
        refetch,
    } = useQuery("products", () =>
        axiosInstance(`products`).then((response) => response.data)
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

    //Handle Delete Product
    const handleDeleteProduct = async (role) => {
        // const role = "admin";
        await axiosInstance
            .delete(`products/${deleteProduct._id}`)
            .then((response) => {
                refetch();
                setDeleteProduct(null);
                Swal.fire({
                    icon: "success",
                    title: `Product deleted successfully`,
                    showConfirmButton: false,
                    timer: 2500,
                });
            })
            .catch((error) => {
                setDeleteProduct(null);
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
                Manage All Products
            </h3>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Available</th>
                            <th>Min Order</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <ProductRow
                                key={product._id}
                                product={product}
                                index={index}
                                setDeleteProduct={setDeleteProduct}
                                refetch={refetch}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            {deleteProduct && (
                <DeleteConfirmModal deleteButtonClicked={handleDeleteProduct} title={deleteProduct.name} />
            )}
        </div>
    );
};

export default ManageProducts;
