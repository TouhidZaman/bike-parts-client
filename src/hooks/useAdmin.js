import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useAdmin = (user) => {
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyAdmin = async () => {
            const email = user?.email;
            if (email) {
                await axiosInstance.get(`admin/${email}`).then((response) => {
                    setAdmin(response.data.admin);
                });
                setLoading(false);
            }
        };
        verifyAdmin();
    }, [user]);
    return [admin, loading];
};

export default useAdmin;
