import Joi from "joi";
import React from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import auth from "../../../../../firebase/firebase.init";
import { joiResolver } from "@hookform/resolvers/joi";
import Swal from "sweetalert2";

const ResetPassword = () => {
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

    //Joi Validation Schema
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
    });

    if (sending) {
        return "LOADING...";
    }

    const handlePasswordReset = async (data) => {
        alert("Inside handle reset");
        const { email } = data;
        await sendPasswordResetEmail(email);
        Swal.fire({
            icon: "success",
            title: `Password reset email has been sent successfully`,
            showConfirmButton: false,
            timer: 2500,
        });
    };

    return (
        <div className="rounded-lg shadow px-10 py-6 w-3/4 lg:w-1/3 mx-auto my-12">
            <h3 className="mb-6 text-3xl text-primary text-center">
                Password Reset Form
            </h3>
            <form onSubmit={handleSubmit(handlePasswordReset)}>
                <div className="mb-4">
                    {/* <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Your email
                    </label> */}
                    <input
                        placeholder="Enter your email"
                        className="input input-bordered input-primary w-full max-w-lg"
                        {...register("email")}
                    />
                    <p className="text-red-400">{errors.email?.message}</p>
                </div>
                {error && (
                    <p className="my-4 text-sm text-red-500">{error?.message}</p>
                )}
                <input
                    className="mb-2 btn btn-active btn-primary w-full max-w-lg uppercase text-white bg-gradient-to-r from-secondary to-primary"
                    type="submit"
                    value={"Send Password Reset Email"}
                />
                <p className="text-center sm:text-left my-2 text-sm text-gray-400">
                    Remember your password ?
                    <Link className="px-2 font-medium text-blue-500" to={"/login"}>
                        go back to login
                    </Link>
                </p>
                <p className="text-center sm:text-left my-2 text-sm text-gray-400">
                    New to bike parts ?
                    <Link className="px-2 font-medium text-blue-500" to={"/sign-up"}>
                        Create an account
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default ResetPassword;
