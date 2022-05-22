import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useToken = (user) => {
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getToken = async () => {
            const email = user?.user?.email;
            const currentUser = { email };
            if (email) {
                setLoading(true);
                const { data } = await axiosInstance.put(
                    `users/${email}`,
                    currentUser
                );
                setToken(data.accessToken);
                localStorage.setItem("accessToken", data.accessToken);
                setLoading(false);
            }
        };
        getToken();
    }, [user]);
    return [token, loading];
};

export default useToken;
