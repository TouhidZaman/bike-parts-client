import React from "react";
import { FaMotorcycle } from "react-icons/fa";


const Logo = ({ className }) => {
    return <h3 className={`text-neutral-content font-bold flex items-center ${className}`}>
        <FaMotorcycle className="mr-2" />
        Bike Parts
    </h3>;
};

export default Logo;
