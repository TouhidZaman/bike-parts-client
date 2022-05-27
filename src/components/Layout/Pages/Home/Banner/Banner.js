import React from "react";
import { Link } from "react-router-dom";
import bannerBg from "../../../../../images/banner-bg.webp";
import bike from "../../../../../images/motorcycles-photo.jpg";

const Banner = () => {
    return (
        <div
            class="hero min-h-[90vh]"
            style={{
                background: `url(${bannerBg})`,
                backgroundSize: "cover",
            }}
        >
            <div class="hero-overlay bg-opacity-60"></div>
            <div class="hero-content flex-col lg:flex-row-reverse">
                <img alt="" src={bike} class="ml-4 max-w-sm rounded-lg shadow-2xl" />
                <div className="text-center lg:text-left text-neutral-content max-w-xs lg:max-w-lg">
                    <h1 class="text-3xl lg:text-5xl font-bold">
                        <span className="block mb-3">Hello There !</span>
                        <span> Welcome to Bike Parts</span>
                    </h1>
                    <p class="py-6 text-lg lg:text-xl">
                        This is Bangladesh largest bike spare parts manufacturer! We
                        build all kind of parts of a bike
                    </p>
                    <Link to={"/login"} class="btn btn-primary">
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;
