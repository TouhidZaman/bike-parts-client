import React from "react";
import AllReviews from "./AllReviews/AllReviews";
import Banner from "./Banner/Banner";
import DisplayProducts from "./DisplayProducts/DisplayProducts";

const Home = () => {
    return (
        <>
            <Banner />
            <DisplayProducts />
            <AllReviews />
        </>
    );
};

export default Home;
