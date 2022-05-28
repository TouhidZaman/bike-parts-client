import React from "react";
import bikeEngineBg from "../../../../../images/bike-engine-bg.webp";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineRateReview } from "react-icons/md";
import { BiMoney } from "react-icons/bi";

const BusinessSummary = () => {
    return (
        <section
            className="hero min-h-[90vh]"
            style={{
                background: `url(${bikeEngineBg})`,
                backgroundSize: "cover",
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div class="hero-content text-center text-neutral-content">
                <div class="w-full">
                    <div className="flex flex-col items-center pb-6">
                        <h3 className="text-4xl font-bold mb-1 uppercase">
                            Thousands of Business Trust Us
                        </h3>
                        <p className="text-xl">
                            Try to understand users expectation
                        </p>
                        <div className="my-3 border-b w-[120px] border-stone-300 rounded-lg"></div>
                    </div>
                    <div className="flex justify-center">
                        <div class="stats bg-accent text-neutral-content stats-vertical lg:stats-horizontal shadow">
                            <div class="stat place-items-center">
                                <IoIosPeople className="text-5xl" />
                                <div class="stat-value">31K</div>
                                <div class="stat-desc">
                                    People we have served already
                                </div>
                            </div>
                            <div class="stat place-items-center">
                                <BiMoney className="text-5xl" />
                                <div class="stat-value">50K+</div>
                                <div class="stat-desc">Annual Revenue</div>
                            </div>
                            <div class="stat place-items-center">
                                <IoIosPeople className="text-5xl" />
                                <div class="stat-value">100K+</div>
                                <div class="stat-desc">Customers we have now</div>
                            </div>
                            <div class="stat place-items-center">
                                <MdOutlineRateReview className="text-5xl" />
                                <div class="stat-value">1K+</div>
                                <div class="stat-desc">Customers Reviews</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BusinessSummary;
