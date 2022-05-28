import React from "react";
import AllReviews from "./AllReviews/AllReviews";
import Banner from "./Banner/Banner";
import BusinessSummary from "./BusinessSummary/BusinessSummary";
import Contact from "./Contact/Contact";
import DisplayProducts from "./DisplayProducts/DisplayProducts";

const Home = () => {
    return (
        <>
            <Banner />
            <DisplayProducts />
            <BusinessSummary />
            <AllReviews />
            <Contact />
        </>
    );
};

export default Home;
