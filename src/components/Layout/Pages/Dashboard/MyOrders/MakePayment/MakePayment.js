import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../../../../api/axiosInstance';
import Spinner from '../../../../../UI/Spinner/Spinner';

const MakePayment = () => {
    let { orderId } = useParams();
    const {
        isLoading,
        error,
        data: order,
    } = useQuery(["orders", orderId], () =>
        axiosInstance(`orders/${orderId}`).then(
            (response) => response.data
        )
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
        <div>
            This is payment page 
            <h3>Order ID: {orderId}</h3> 
            <h3>Product Name: {order?.product}</h3>
        </div>
    );
};

export default MakePayment;