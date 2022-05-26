import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useToken = (user) => {
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getToken = async () => {
            const email = user?.user?.email;
            const name = user?.user?.displayName;
            const image = user?.user?.photoURL;
            const currentUser = { name, email, image };

            if (email) {
                setLoading(true);
                const { data } = await axiosInstance.put(
                    `login/${email}`,
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
