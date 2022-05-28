import React from "react";
import AllReviews from "./AllReviews/AllReviews";
import Banner from "./Banner/Banner";
import BusinessSummary from "./BusinessSummary/BusinessSummary";
import DisplayProducts from "./DisplayProducts/DisplayProducts";

const Home = () => {
    return (
        <>
            <Banner />
            <DisplayProducts />
            <BusinessSummary />
            <AllReviews />
        </>
    );
};

export default Home;
