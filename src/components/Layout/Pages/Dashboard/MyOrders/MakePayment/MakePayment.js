import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../../../api/axiosInstance";
import Spinner from "../../../../../UI/Spinner/Spinner";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckotForm/CheckoutForm";

const stripePromise = loadStripe(
    "pk_test_51L4StSHjQhSzHcWshxNleYTK2EbOSZj0A0aGovkuaG1iXyToTkhaSHaGoPSBbXJN9i1BEPI0RJXbyFn6smfkADme00d8a6gJkf"
);

const MakePayment = () => {
    let { orderId } = useParams();
    const {
        isLoading,
        error,
        data: order,
    } = useQuery(["orders", orderId], () =>
        axiosInstance(`orders/${orderId}`).then((response) => response.data)
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

    const totalPrice = parseFloat(order?.price) * parseInt(order?.quantity) || 0;

    return (
        <div className="shadow w-11/12 mx-auto p-8 pt-4 text-center my-8">
            <h3 className="text-center text-primary text-3xl mb-8">
                Complete Your Payment
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="card max-w-lg bg-base-200 xm-auto">
                    <div class="card-body text-left">
                        <h2 class="text-2xl">
                            Pay For:{" "}
                            <span className="text-success">{order?.product}</span>
                        </h2>
                        <p className="text-xl">Price: {order?.price}</p>
                        <p className="text-xl">Quantity: {order?.quantity}</p>
                        <p className="text-xl">Total Price: {totalPrice}</p>
                    </div>
                </div>
                {/* Payment Options  */}
                <div class="card max-w-lg bg-base-200 xm-auto">
                    <div class="card-body text-left">
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};
// <div>
//     This is payment page
//     <h3>Order ID: {orderId}</h3>
//     <h3>Pay For: {order?.product}</h3>
// </div>

export default MakePayment;
