import Joi from "joi";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
    useCreateUserWithEmailAndPassword,
    useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../../../../firebase/firebase.init";
import { useNavigate } from "react-router-dom";
import useToken from "../../../../../hooks/useToken";

const Signup = () => {
    //Create User with Email and Password
    const [createUserWithEmailAndPassword, user, loading, createError] =
        useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    //To Update User Profile
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const [token, tokenLoading] = useToken(user); //Inserting user to DB and getting access token

    //Handling Navigation
    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    //Joi Validation Schema
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        password: Joi.string().min(6).max(20).required(),
        terms: Joi.invalid(false),
    });

    //React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
    });

    //Handling Form submit
    const handleSignUp = async (data) => {
        const { name, email, password } = data;
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
    };

    //Handling Loading state
    if (loading || updating || tokenLoading) {
        return <p className="text-3xl text-center my-20">Loading...</p>;
    }

    return (
        <div className="rounded-lg shadow px-10 py-6 w-3/4 lg:w-1/3 mx-auto my-10">
            <h3 className="mb-6 text-3xl text-primary text-center">Sign Up Form</h3>

            <form onSubmit={handleSubmit(handleSignUp)}>
                <div className="mb-6">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Your name
                    </label>
                    <input
                        id="name"
                        className="input input-bordered input-primary w-full max-w-lg"
                        {...register("name")}
                    />
                    <p className="text-red-400">{errors.name?.message}</p>
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Your email
                    </label>
                    <input
                        id="email"
                        className="input input-bordered input-primary w-full max-w-lg"
                        {...register("email")}
                    />
                    <p className="text-red-400">{errors.email?.message}</p>
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="input input-bordered input-primary w-full max-w-lg"
                        {...register("password")}
                    />
                    <p className="text-red-400">{errors.password?.message}</p>
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            type="checkbox"
                            {...register("terms")}
                            value=""
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                        />
                    </div>
                    <label
                        htmlFor="remember"
                        className="ml-2 text-sm font-medium text-gray-900"
                    >
                        {errors.terms ? (
                            <p className="text-red-400">
                                Accepts terms and conditions
                            </p>
                        ) : (
                            <p>Accepts terms and conditions</p>
                        )}
                    </label>
                </div>

                {(createError || updateError) && (
                    <p className="text-red-400">
                        {createError.message || updateError.message}
                    </p>
                )}

                <input
                    className="btn btn-active btn-primary w-full uppercase text-white bg-gradient-to-r from-secondary to-primary"
                    type="submit"
                    value="Sign-Up"
                />
            </form>
        </div>
    );
};

export default Signup;
