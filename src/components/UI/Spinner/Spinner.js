import React from "react";
import spinner from "../../../images/spinner-1s-200px.svg";

const Spinner = ({ containerClass, spinnerSize }) => {
    return (
        <div className={containerClass}>
            <img src={spinner} style={{ height: spinnerSize }} alt="Loading..." />
        </div>
    );
};

export default Spinner;
