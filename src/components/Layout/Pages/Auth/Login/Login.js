import Joi from "joi";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
    useSignInWithEmailAndPassword,
    useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../../../../firebase/firebase.init";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToken from "../../../../../hooks/useToken";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    //Sign in with Email and Password
    const [signInWithEmailAndPassword, user, loading, error] =
        useSignInWithEmailAndPassword(auth);

    //Sign in with google
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const handleGoogleAuth = () => signInWithGoogle();

    const [token, tokenLoading] = useToken(user || gUser); //Inserting user to DB and getting access token

    //Handling Navigation
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || "/dashboard";

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, navigate, from]);

    //Joi Validation Schema
    const schema = Joi.object({
        password: Joi.string().min(6).max(20).required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
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
    const handleLogin = (data) => {
        const { email, password } = data;
        signInWithEmailAndPassword(email, password);
    };

    //Handling loading state
    if (loading || tokenLoading || gLoading) {
        return <p className="text-3xl text-center my-20">Loading...</p>;
    }

    return (
        <div className="rounded-lg shadow px-10 py-6 w-3/4 lg:w-1/3 mx-auto my-12">
            <h3 className="mb-4 text-3xl text-primary text-center">Login Form</h3>
            <form className="mx-auto" onSubmit={handleSubmit(handleLogin)}>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Your email
                    </label>
                    <input
                        placeholder="Enter your email"
                        className="input input-bordered input-primary w-full max-w-lg"
                        {...register("email")}
                    />
                    <p className="text-red-400">{errors.email?.message}</p>
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Your Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="input input-bordered input-primary w-full max-w-lg"
                        {...register("password")}
                    />
                    <p className="text-red-400">{errors.password?.message}</p>
                </div>
                <div className="label mb-3">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                        />
                        <label
                            htmlFor="remember"
                            className="ml-2 text-sm font-medium text-gray-900"
                        >
                            Remember me
                        </label>
                    </div>
                    <p className="text-sm">
                        <Link
                            className="px-2 font-medium text-blue-500"
                            to={"/reset-password"}
                        >
                            Reset password
                        </Link>
                    </p>
                </div>
                {error && (
                    <p className="my-4 text-sm text-red-500">{error?.message}</p>
                )}
                <input
                    className="btn btn-active btn-primary w-full max-w-lg uppercase text-white bg-gradient-to-r from-secondary to-primary"
                    type="submit"
                    value={"login"}
                />

                <p className="text-center sm:text-left my-4 text-sm text-gray-400">
                    New to Bike Parts ?
                    <Link className="px-2 font-medium text-blue-500" to={"/sign-up"}>
                        Create an account
                    </Link>
                </p>
            </form>
            {/* Google sign in area  */}
            <div>
                <div class="divider">OR</div>
                <button
                    onClick={handleGoogleAuth}
                    class="btn btn-outline btn-primary w-full max-w-lg hover:text-white"
                >
                    <FcGoogle className="mr-2 font-bold text-xl" />
                    <span className="">Sign In With Google</span>
                </button>
                {gError && (
                    <p className="mt-2 text-sm text-red-500">
                        <span className="font-medium">Error: {gError?.code}</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
