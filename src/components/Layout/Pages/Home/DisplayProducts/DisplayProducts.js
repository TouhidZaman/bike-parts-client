import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import axiosInstance from "../../../../../api/axiosInstance";
import Spinner from "../../../../UI/Spinner/Spinner";

const DisplayProducts = () => {
    const limitTo = 6;
    const {
        isLoading,
        error,
        data: products,
    } = useQuery(["products", limitTo], () =>
        axiosInstance(`products?limitTo=${limitTo}`).then(
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
        <div className="bg-gray-800">
            <div className="w-5/6 md:w-2/3 lg:w-11/12 mx-auto pb-8 pt-6">
                <div className="flex flex-col items-center pb-6">
                    <h3 className="text-3xl text-primary mb-3">
                        Most demandable six bike parts
                    </h3>
                    <div className="mb-2 border-b w-[120px] border-stone-300 rounded-lg"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="card max-w-md bg-accent text-neutral-content  shadow-xl"
                        >
                            <figure class="bg-base-200">
                                <img
                                    src={product.image}
                                    className="h-[200px] my-4"
                                    alt="product"
                                />
                            </figure>
                            <div className="card-body px-4 pt-2">
                                <h2 className="card-title text-2xl">
                                    {product.name}
                                </h2>
                                <p>
                                    Description:
                                    <span className="ml-2">
                                        {product.description}
                                    </span>
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
                                <div class="flex justify-center mt-12">
                                    <Link
                                        to={`purchase/${product._id}`}
                                        class="btn btn-primary absolute bottom-4"
                                    >
                                        Buy Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DisplayProducts;
