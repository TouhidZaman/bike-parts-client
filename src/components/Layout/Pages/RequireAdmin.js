import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import auth from "../../../firebase/firebase.init";
import useAdmin from "../../../hooks/useAdmin";
import Swal from "sweetalert2";
import Spinner from "../../UI/Spinner/Spinner";

const RequireAdmin = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);
    // const location = useLocation();

    //Handling Loading state
    if (loading || adminLoading) {
        return <Spinner containerClass="mt-24 flex justify-center" spinnerSize={'300px'}/>;
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
