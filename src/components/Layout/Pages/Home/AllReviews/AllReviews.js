import React from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../../../../api/axiosInstance";
import Spinner from "../../../../UI/Spinner/Spinner";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";

const AllReviews = () => {
    const {
        isLoading,
        error,
        data: reviews,
    } = useQuery("reviews", () =>
        axiosInstance(`reviews`).then((response) => response.data)
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
        <section id="all-reviews" className="bg-gray-800">
            <div className="w-5/6 md:w-2/3 lg:w-11/12 mx-auto pb-8 pt-6">
                <div className="flex flex-col items-center pb-6">
                    <h3 className="text-3xl text-primary mb-3">
                        What Our Clients say!
                    </h3>
                    <div className="mb-2 border-b w-[120px] border-stone-300 rounded-lg"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div
                            key={review._id}
                            className="card max-w-md bg-accent text-neutral-content  shadow-xl"
                        >
                            <div className="card-body px-4 pt-2">
                                <h2 className="card-title text-2xl">
                                    {review.userName}
                                </h2>
                                <p className="flex items-center">
                                    <span className="mr-2">Rating</span>
                                    <Rating
                                        initialRating={review.rating}
                                        emptySymbol={<FaStar className="" />}
                                        fullSymbol={
                                            <FaStar style={{ color: "goldenrod" }} />
                                        }
                                        fractions={2}
                                        readonly
                                    ></Rating>
                                </p>
                                <p>{review.review}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AllReviews;
