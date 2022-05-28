import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import auth from "../../../../../firebase/firebase.init";
import axiosInstance from "../../../../../api/axiosInstance";
import Spinner from "../../../../UI/Spinner/Spinner";
import { useAuthState } from "react-firebase-hooks/auth";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

const AddReview = () => {
    const [authUser, authLoading] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(null);
    // const navigate = useNavigate();


    //Yup Validation Schema
    const schema = yup.object().shape({
        review: yup.string().required().min(15).label("Review message"),
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

    //Handling Form submit
    const handleAddRating = async (data) => {
        // setLoading(true);
        if (!rating) {
            Swal.fire({
                icon: "error",
                title: `Please Select a rating first`,
                showConfirmButton: false,
                timer: 2500,
            });
        } else {
            const reviewData = {
                userName: authUser.displayName,
                review: data.review,
                rating,
                addedBy: authUser.email,
            };
            console.log(reviewData);
            await axiosInstance
            .post("reviews", reviewData)
            .then((response) => {
                setLoading(false);
                if (response.data.acknowledged) {
                    Swal.fire({
                        icon: "success",
                        title: `Review added successfully, visit review section to see your review`,
                        showConfirmButton: false,
                        timer: 2500,
                    });
                    reset();
                    // navigate("#all-reviews")
                }
            })
            .catch((error) => {

                setLoading(false);
                console.log("error from axios")
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
                        title: `Failed to add Review`,
                        showConfirmButton: false,
                        timer: 2500,
                    });
                }
            });

        }
        
    };

    if (loading || authLoading) {
        return (
            <Spinner
                containerClass="mt-24 flex justify-center"
                spinnerSize={"300px"}
            />
        );
    }

    return (
        <div className="rounded-lg shadow px-4 lg:px-10 py-6 w-10/12 lg:w-2/3 mx-auto my-10">
            <h3 className="mb-4 text-3xl text-primary text-center">
                Add Review Form
            </h3>

            <form onSubmit={handleSubmit(handleAddRating)}>
                <div className="mb-4">
                    <input
                        disabled
                        defaultValue={authUser?.displayName}
                        className="input  input-bordered w-full"
                    />
                    <p className="text-red-400">{errors.name?.message}</p>
                </div>
                <div className="mb-4">
                    <input
                        placeholder="Enter your review message"
                        className="input  input-bordered w-full"
                        {...register("review")}
                    />
                    <p className="text-red-400">{errors.review?.message}</p>
                </div>
                <div className="flex items-center">
                    <span className="mr-2">Give Rating</span>
                    <Rating
                        initialRating={rating}
                        emptySymbol={<FaStar className="" />}
                        fullSymbol={<FaStar style={{ color: "goldenrod" }} />}
                        fractions={2}
                        onChange={(rate) => setRating(rate)}
                    ></Rating>
                </div>

                <div className="flex justify-center my-6">
                    <input
                        className="btn btn-active btn-primary w-full max-w-md uppercase text-white bg-gradient-to-r from-secondary to-primary"
                        type="submit"
                        value="Add Review"
                    />
                </div>
            </form>
        </div>
    );
};

export default AddReview;
