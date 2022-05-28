import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Contact = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        Swal.fire({
            icon: "success",
            title: `Thank your for your message. we will contact with you later`,
            showConfirmButton: false,
            timer: 2500,
        });
        reset();
    };

    return (
        <div className="py-8 bg-gray-800">
            <div className="w-5/6 md:w-2/3 lg:w-3/5 mx-auto bg-gradient-to-r  p-6 sm:p-10 bg-gray-800">
                <div className="flex flex-col items-center text-center pb-10">
                    <h3 className="text-3xl text-primary mb-3">Contact Us</h3>
                    <div className="mb-2 border-b w-[120px] border-stone-300 rounded-lg"></div>
                    <p className="text-stone-500">
                        If you have any quarries feel fee to contact us
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid xl:grid-cols-2 xl:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                                type="text"
                                name="floating_name"
                                {...register("name", {
                                    required: "Name* is required",
                                })}
                                placeholder=" "
                            />
                            <label
                                htmlFor="floating_name"
                                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Your Name
                            </label>
                            {errors.name && (
                                <p className="mt-2 text-sm text-red-500">
                                    <span className="font-medium">
                                        {errors.name?.message}
                                    </span>
                                </p>
                            )}
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                                type="email"
                                name="floating_email"
                                {...register("email", {
                                    required: "Email* is required",
                                })}
                                placeholder=" "
                            />
                            <label
                                htmlFor="floating_email"
                                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Your Email
                            </label>
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-500">
                                    <span className="font-medium">
                                        {errors.email?.message}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                            Your message
                        </label>
                        <textarea
                            name="message"
                            rows="4"
                            className="block p-2.5 w-full text-sm rounded-lg border-2 bg-transparent border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-0"
                            {...register("message", {
                                required: "Your message* is required",
                            })}
                            placeholder="Type Your message..."
                        ></textarea>
                        {errors.message && (
                            <p className="mt-2 text-sm text-red-500">
                                <span className="font-medium">
                                    {errors.message?.message}
                                </span>
                            </p>
                        )}
                    </div>

                    <div className="text-center sm:text-center">
                        <button
                            type="submit"
                            className="mt-2 py-2.5 px-10 mr-2 mb-2 text-sm font-medium focus:outline-none rounded-full border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-400 border-gray-600 hover:text-white"
                        >
                            Submit Your Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
