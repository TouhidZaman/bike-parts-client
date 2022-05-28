import React from 'react';
import { useParams } from 'react-router-dom';

const MakePayment = () => {
    let { orderId } = useParams();

    return (
        <div>
            This is payment page {orderId}
        </div>
    );
};

export default MakePayment;