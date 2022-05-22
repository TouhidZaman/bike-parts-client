import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../../firebase/firebase.init";

const MyProfile = () => {
    const [user, loading] = useAuthState(auth);

    //Handling Loading state
    if (loading) {
        return <p className="text-3xl text-center my-20">Loading...</p>;
    }

    return (
        <div className="shadow w-2/3 mx-auto p-8 text-center text-secondary">
            <h3>Hello {user.displayName}. You are welcome to your profile</h3>
        </div>
    );
};

export default MyProfile;
