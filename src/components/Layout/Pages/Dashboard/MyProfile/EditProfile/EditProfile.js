import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../../../../api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import auth from "../../../../../../firebase/firebase.init";
import Spinner from "../../../../../UI/Spinner/Spinner";
import { useUpdateProfile } from "react-firebase-hooks/auth";

const EditProfile = () => {
    const [loading, setLoading] = useState(false);
    let { email } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [updateProfile] = useUpdateProfile(auth);

    const FILE_SIZE = 500000;
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

    //Yup Validation Schema
    const schema = yup.object().shape({
        phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
        education: yup.string().required().min(10),
        address: yup.string().required().min(10),
        linkedIn: yup.string().required(),
        image: yup
            .mixed()
            .test("required", "Profile image is required", (file) => {
                // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
                if (file[0]) return true;
                return false;
            })
            .test("fileSize", "Image size must be under 500kb", (file) => {
                //if u want to allow only certain file sizes
                return file[0] && file[0].size <= FILE_SIZE;
            })
            .test(
                "fileFormat",
                "Unsupported Format",
                (value) => value[0] && SUPPORTED_FORMATS.includes(value[0].type)
            ),
    });

    const imageStorageKey = "fb5f18fac7081ee3e2053bac9782f2e0";

    //React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    // loading user data
    useEffect(() => {
        const getUser = async () => {
            await axiosInstance(`users/${email}`).then((response) => {
                setUser(response.data);
                //Resetting react hook form
                reset();
            });
        };
        getUser();
    }, [email, reset]);

    //Handling Form submit
    const handleUpdateProfile = async (data) => {
        const { phone, address, linkedIn, education } = data;
        const updatedUser = {
            phone,
            education,
            address,
            linkedIn,
        };
        console.log("updated user", updatedUser);
        // alert("form submitted");
        setLoading(true);
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        await fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((result) => {
                // setLoading(true);
                if (result?.success) {
                    const imageUrl = result.data?.url;
                    updatedUser.image = imageUrl;
                    updateProfile({ photoURL: imageUrl }); //Updating Firebase user profile
                    console.log("final updated user", updatedUser);
                    axiosInstance
                        .put(`users/${email}`, updatedUser)
                        .then((response) => {
                            setLoading(false);
                            if (response.data.acknowledged) {
                                Swal.fire({
                                    icon: "success",
                                    title: `Profile updated successfully`,
                                    showConfirmButton: false,
                                    timer: 2500,
                                });
                                navigate("/dashboard");
                            }
                        })
                        .catch((error) => {
                            setLoading(false);
                            if (
                                error.response.status === 401 ||
                                error.response.status === 403
                            ) {
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
                                    title: `Failed to update profile`,
                                    showConfirmButton: false,
                                    timer: 2500,
                                });
                            }
                        });
                }
            })
            .catch((error) => {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: `Failed to update profile`,
                    showConfirmButton: false,
                    timer: 2500,
                });
            });
    };

    //Handling Loading state
    if (loading) {
        return (
            <Spinner
                containerClass="mt-24 flex justify-center"
                spinnerSize={"300px"}
            />
        );
    }

    // console.log("testing", user);

    return (
        <div className="shadow w-11/12 mx-auto p-8 pt-4 text-center my-8">
            <h3 className="text-center text-primary text-3xl mb-4">
                Update your profile
            </h3>

            <form onSubmit={handleSubmit(handleUpdateProfile)}>
                <div className="flex flex-col w-full lg:flex-row my-12 text-left">
                    <div className="grid flex-1">
                        <div className="mb-4">
                            <input
                                disabled
                                className="input input-bordered w-full max-w-lg"
                                defaultValue={user.name}
                                // {...register("name")}
                            />
                            {/* <p className="text-red-400">{errors.name?.message}</p> */}
                        </div>
                        <div className="mb-4">
                            <input
                                disabled
                                defaultValue={user.email}
                                className="input input-bordered w-full max-w-lg"
                                // {...register("email")}
                            />
                            <p className="text-red-400">
                                {/* {errors.email?.message} */}
                            </p>
                        </div>
                        <div className="mb-4">
                            <input
                                placeholder="Enter your mobile number"
                                defaultValue={user.phone}
                                className="input input-bordered w-full max-w-lg"
                                {...register("phone")}
                            />
                            <p className="text-red-400">{errors.phone?.message}</p>
                        </div>
                        <div className="mb-4">
                            <input
                                placeholder="Enter your education"
                                defaultValue={user.education}
                                className="input input-bordered w-full max-w-lg"
                                {...register("education")}
                            />
                            <p className="text-red-400">
                                {errors.education?.message}
                            </p>
                        </div>
                    </div>
                    <div className="divider lg:divider-horizontal"></div>
                    <div className="grid flex-1">
                        <div className="mb-4">
                            <input
                                placeholder="Enter your location"
                                defaultValue={user.address}
                                className="input input-bordered w-full max-w-lg"
                                {...register("address")}
                            />
                            <p className="text-red-400">{errors.address?.message}</p>
                        </div>
                        <div className="mb-4">
                            <input
                                placeholder="Enter your linkedin profile"
                                defaultValue={user.linkedIn}
                                className="input input-bordered w-full max-w-lg"
                                {...register("linkedIn")}
                            />
                            <p className="text-red-400">
                                {errors.linkedIn?.message}
                            </p>
                        </div>
                        <div className="mb-4">
                            <label className="inline-block mb-2 text-gray-500">
                                Upload Profile Image(jpg,png,gif,jpeg)
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                    <div className="flex flex-col items-center justify-center pt-7">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                            Select profile photo
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        {...register("image")}
                                        className="opacity-0"
                                    />
                                </label>
                            </div>
                            <p className="text-red-400">{errors.image?.message}</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <input
                        className="btn btn-active btn-primary w-full max-w-xs uppercase text-white bg-gradient-to-r from-secondary to-primary"
                        type="submit"
                        value="Update Now"
                    />
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
