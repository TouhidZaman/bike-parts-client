import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../../firebase/firebase.init";
import Spinner from "../../../../UI/Spinner/Spinner";

const MyProfile = () => {
    const [user, loading] = useAuthState(auth);

    //Handling Loading state
    if (loading) {
        return <Spinner containerClass="mt-24 flex justify-center" spinnerSize={'300px'}/>;
    }

    return (
        <div className="shadow w-2/3 mx-auto p-8 text-center text-secondary">
            <h3 className="text-center text-primary text-3xl lg:my-4">
                Welcome to your Dashboard
            </h3>
            <h3>Hello {user.displayName}. You are welcome to your profile</h3>
        </div>
    );
};

export default MyProfile;