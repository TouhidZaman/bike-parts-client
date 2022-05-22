import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import auth from "../../../firebase/firebase.init";
import useAdmin from "../../../hooks/useAdmin";
import Swal from "sweetalert2";


const RequireAdmin = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);
    // const location = useLocation();

    //Handling Loading state
    if (loading || adminLoading) {
        return <p className="text-3xl text-center my-20">Loading...</p>;
    }
    if (!user || !admin) {
        Swal.fire({
            icon: "error",
            title: `Ops...!`,
            text: `Unauthorized Access`,
        });
        signOut(auth);
        localStorage.removeItem("accessToken");
        return <Navigate to={"/login"} />;
    }
    return children;
};

export default RequireAdmin;
