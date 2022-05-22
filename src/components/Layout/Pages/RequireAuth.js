import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../../firebase/firebase.init";

const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();

    //Handling Loading state
    if (loading) {
        return <p className="text-3xl text-center my-20">Loading...</p>;
    }
    if (!user) {
        return <Navigate to={"/login"} state={{ from: location }} replace />;
    }
    return children;
};

export default RequireAuth;
