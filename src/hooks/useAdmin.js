import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";
import auth from "../firebase/firebase.init";

const useAdmin = (user) => {
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAdmin = async () => {
            const email = user?.email;
            if (email) {
                await axiosInstance
                    .get(`admin/${email}`)
                    .then((response) => {
                        setAdmin(response.data.admin);
                        setLoading(false);
                    })
                    .catch((error) => {
                        setLoading(false);
                        if (
                            error.response.status === 401 ||
                            error.response.status === 403
                        ) {
                            Swal.fire({
                                icon: "error",
                                title: `${error.response.status} !`,
                                text: `${error.response.data.message}. Login again to continue`,
                            });
                            signOut(auth);
                            localStorage.removeItem("accessToken");
                            navigate("/login");
                        }
                    });
            }
        };
        verifyAdmin();
    }, [user, navigate]);
    return [admin, loading];
};

export default useAdmin;
