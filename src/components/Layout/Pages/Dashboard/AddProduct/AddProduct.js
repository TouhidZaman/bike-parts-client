import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosInstance from "../../../../../api/axiosInstance";
import Swal from "sweetalert2";
import auth from "../../../../../firebase/firebase.init";
import { signOut } from "firebase/auth";
import Spinner from "../../../../UI/Spinner/Spinner";

const AddProduct = () => {
    const FILE_SIZE = 500000;
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
    const [loading, setLoading] = useState(false);

    //Yup Validation Schema
    const schema = yup.object().shape({
        name: yup.string().required().min(10).label('Name'),
        description: yup.string().required().min(15).label('Description'),
        availableQuantity: yup.number().typeError("Invalid available quantity"),
        minOrderQuantity: yup.number().typeError("Invalid order quantity"),
        price: yup.number().typeError("Invalid product price"),
        image: yup
            .mixed()
            .test("required", "Product image is required", (file) => {
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

    //Handling Form submit
    const handleAddProduct = async (data) => {
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
                    data.image = imageUrl;
                    axiosInstance
                        .post("products", data)
                        .then((response) => {
                            setLoading(false);
                            if (response.data.acknowledged) {
                                Swal.fire({
                                    icon: "success",
                                    title: `Product added successfully`,
                                    showConfirmButton: false,
                                    timer: 2500,
                                });
                                reset();
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
                                    title: `Failed to add product`,
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
                    title: `Failed to add product`,
                    showConfirmButton: false,
                    timer: 2500,
                });
            });
    };

    if (loading) {
        return (
            <Spinner
                containerClass="mt-24 flex justify-center"
                spinnerSize={"300px"}
            />
        );
    }

    return (
        <div className="rounded-lg shadow px-10 py-6 w-2/3 mx-auto my-10">
            <h3 className="mb-4 text-3xl text-primary text-center">
                Add Product Form
            </h3>

            <form onSubmit={handleSubmit(handleAddProduct)}>
                <div className="mb-4">
                    <input
                        placeholder="Enter product name"
                        className="input  input-bordered w-full"
                        {...register("name")}
                    />
                    <p className="text-red-400">{errors.name?.message}</p>
                </div>
                <div className="mb-4">
                    <input
                        placeholder="Enter product short description"
                        className="input  input-bordered w-full"
                        {...register("description")}
                    />
                    <p className="text-red-400">{errors.description?.message}</p>
                </div>
                <div className="grid xl:grid-cols-3 xl:gap-6">
                    <div className="mb-4">
                        <input
                            placeholder="Enter available quantity"
                            className="input input-bordered w-full max-w-lg"
                            {...register("availableQuantity")}
                        />
                        <p className="text-red-400">
                            {errors.availableQuantity?.message}
                        </p>
                    </div>
                    <div className="mb-4">
                        <input
                            placeholder="Enter order quantity"
                            className="input input-bordered w-full max-w-lg"
                            {...register("minOrderQuantity")}
                        />
                        <p className="text-red-400">
                            {errors.minOrderQuantity?.message}
                        </p>
                    </div>
                    <div className="mb-4">
                        <input
                            placeholder="Enter price"
                            className="input input-bordered w-full max-w-lg"
                            {...register("price")}
                        />
                        <p className="text-red-400">{errors.price?.message}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="inline-block mb-2 text-gray-500">
                        Upload Image(jpg,png,gif,jpeg)
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
                                    Select a photo
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
                <div className="flex justify-center my-6">
                    <input
                        className="btn btn-active btn-primary w-full max-w-md uppercase text-white bg-gradient-to-r from-secondary to-primary"
                        type="submit"
                        value="Add Product"
                    />
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
