import React from "react";
import { FaMotorcycle } from "react-icons/fa";
import { Link } from "react-router-dom";


const Logo = ({ className }) => {
    return <Link to={'/'} className={`text-neutral-content font-bold flex items-center ${className}`}>
        <FaMotorcycle className="mr-2" />
        Bike Parts
    </Link>;
};

export default Logo;
