import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../../../api/axiosInstance";
import Spinner from "../../../UI/Spinner/Spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase/firebase.init";
import { signOut } from "firebase/auth";

const Purchase = () => {
    let { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authUser, authLoading] = useAuthState(auth);

    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    //Yup Validation Schema
    const schema = yup.object().shape({
        address: yup.string().required().min(15).label("Address"),
        quantity: yup
            .number()
            .typeError("you must specify a number")
            .min(product?.minOrderQuantity, "Below minimum order quantity")
            .max(product?.availableQuantity, "Above available quantity"),
        phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
    });

    //React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    // loading user data
    useEffect(() => {
        const getUser = async () => {
            await axiosInstance(`products/${productId}`)
                .then((response) => {
                    setProduct(response.data);
                    //Resetting react hook form
                    reset();
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                });
        };
        getUser();
    }, [productId, reset]);

    //Handling Form submit
    const handlePlaceOrder = async (data) => {
        alert("working");
        // setLoading(true);
        const { quantity, phone, address } = data;
        // const totalPrice = parseFloat(product?.price) * parseInt(quantity);

        const orderData = {
            productId: product?._id,
            product: product?.name,
            price: product?.price,
            quantity,
            phone,
            address,
            payment: false,
            addedBy: authUser.email,
        };
        console.log("Order data", orderData);
        await axiosInstance
            .post("orders", orderData)
            .then((response) => {
                setLoading(false);
                if (response.data.acknowledged) {
                    Swal.fire({
                        icon: "success",
                        title: `Your order is placed successfully. go to my orders and complete the payment`,
                        showConfirmButton: false,
                        timer: 2500,
                    });
                    reset();
                    // navigate("#all-orders")
                }
            })
            .catch((error) => {
                setLoading(false);
                console.log("error from axios");
                if (error.response.status === 401 || error.response.status === 403) {
                    Swal.fire({
                        icon: "error",
                        title: `${error.response.status} !`,
                        text: `${error.response.data.message}. Login again to continue`,
                    });
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: `Failed to place order`,
                        showConfirmButton: false,
                        timer: 2500,
                    });
                }
            });
    };

    //Handling Loading state
    if (loading || authLoading) {
        return (
            <Spinner
                containerClass="mt-24 flex justify-center"
                spinnerSize={"300px"}
            />
        );
    }

    // console.log(product);

    return (
        <section className="bg-gray-800">
            <div className="w-5/6 md:w-2/3 lg:w-11/12 mx-auto pb-8 pt-6">
                <div className="flex flex-col items-center pb-6">
                    <h3 className="text-3xl text-primary mb-3">Purchase Product</h3>
                    <div className="mb-2 border-b w-[120px] border-stone-300 rounded-lg"></div>
                </div>
                <div className="bg-accent text-neutral-content shadow-xl lg:p-4">
                    <div class="card lg:card-side">
                        <figure>
                            <img
                                src={product.image}
                                className="w-[300px]"
                                alt="product"
                            />
                        </figure>
                        <div class="card-body">
                            <h2 className="card-title text-2xl">{product.name}</h2>
                            <p>
                                Description:
                                <span className="ml-2">{product.description}</span>
                            </p>
                            <div className="">
                                <p>
                                    Price:
                                    <span className="ml-2 text-primary text-xl">
                                        ৳{product.price}
                                    </span>
                                </p>
                                <p>
                                    Available Quantity:
                                    <span className="ml-2 text-primary text-xl">
                                        {product.availableQuantity}
                                    </span>
                                </p>
                                <p>
                                    Minimum Order Quantity:
                                    <span className="ml-2 text-primary text-xl">
                                        {product.minOrderQuantity}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Purchase form  */}
                    <div className="max-w-lg mx-auto text-neutral-content p-4 mb-6">
                        <h3 className="mb-4 text-3xl text-center">
                            Please fill-up this form to continue
                        </h3>

                        <form onSubmit={handleSubmit(handlePlaceOrder)}>
                            <div className="mb-4">
                                <input
                                    readOnly
                                    defaultValue={authUser?.displayName}
                                    className="input input-ghost w-full max-w-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    placeholder="Enter your order quantity"
                                    defaultValue={product?.minOrderQuantity}
                                    className="input input-ghost w-full max-w-lg"
                                    {...register("quantity")}
                                />
                                <p className="text-red-400">
                                    {errors.quantity?.message}
                                </p>
                            </div>
                            <div className="mb-4">
                                <input
                                    placeholder="Enter your phone number"
                                    className="input input-ghost w-full max-w-lg"
                                    {...register("phone")}
                                />
                                <p className="text-red-400">
                                    {errors.phone?.message}
                                </p>
                            </div>
                            <div className="mb-4">
                                <input
                                    placeholder="Enter your address message"
                                    className="input input-ghost w-full max-w-lg"
                                    {...register("address")}
                                />
                                <p className="text-red-400">
                                    {errors.address?.message}
                                </p>
                            </div>

                            <input
                                disabled={errors.quantity}
                                className="btn btn-active btn-primary w-full max-w-lg uppercase text-white bg-gradient-to-r from-secondary to-primary"
                                type="submit"
                                value="Place Order"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Purchase;
