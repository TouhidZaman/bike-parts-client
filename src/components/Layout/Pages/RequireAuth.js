import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../../firebase/firebase.init";
import Spinner from "../../UI/Spinner/Spinner";

const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();

    //Handling Loading state
    if (loading) {
        return <Spinner containerClass="mt-24 flex justify-center" spinnerSize={'300px'}/>;
    }
    if (!user) {
        return <Navigate to={"/login"} state={{ from: location }} replace />;
    }
    return children;
};

export default RequireAuth;
