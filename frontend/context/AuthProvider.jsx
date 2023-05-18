import {createContext, useEffect, useState} from "react";
import {notifications} from '@mantine/notifications';
import {useRouter} from "next/router";
import jwt_decode from "jwt-decode";
import axios from "axios";

import MyLoader from "@/components/MyLoader";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const AuthContext = createContext();

export default AuthContext;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.log(error);
        notifications.show({
            title: "Error",
            message: error?.response?.data?.detail,
            color: "red",
        })
    }
)

export const AuthProvider = ({children}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState(null);
    const [userName, setUserName] = useState(null);
    const [avatarURL, setAvatarURL] = useState(null);

    const getUserData = async () => {
        const response = axiosInstance
            .get("profile/")
            .then((response) => {
                return response.data;
            })

        return response;
    };

    useEffect(() => {
        setLoading(true);
        axiosInstance
            .post("/token/refresh/")
            .then((response) => {
                const token = response?.data?.access || null;
                if (token) {
                    setAccessToken(token);
                    
                    const userData = await getUserData();
                    setUserName(userData.username);
                    setAvatarURL(BASE_URL.slice(0, -5) + userData.avatar);
                }
            })
            .then(() => setLoading(false))
    }, [])

    const registerUser = async (form, values) => {
        const body = {
            first_name: values.first_name || "",
            last_name: values.last_name || "",
            username: values.username,
            email: values.email,
            password: values.password,
        };

        await axiosInstance
            .post("/profile/", JSON.stringify(body))
            .then((response) => {
                router.push("/account/login");
            })
            .catch((error) => {
                if (error.response.data.password) {
                    error.response.data.confirmPassword = error.response.data.password;
                }
                form.setErrors(error.response.data);
            });
    };

    const loginUser = async (form, values) => {
        const body = {
            username: values.username,
            password: values.password,
        };

        await axiosInstance
            .post("/token/", JSON.stringify(body))
            .then((response) => {
                let token = response.data.access;
                setAccessToken(token);
                setUserName(jwt_decode(token).username);
                setAvatarURL(BASE_URL.slice(0, -5) + jwt_decode(token).avatar);
                router.push("/");
            })
            .catch((error) => {
                form.setErrors({
                    username: "Invalid Credentials",
                    password: "Invalid Credentials",
                });
            })
    };

    const logoutUser = () => {
        setAccessToken(null);
        setUserName(null);
        router.push("/");
    };

    const contextData = {
        userName: userName,
        setUserName: setUserName,
        accessToken: accessToken,
        setAccessToken: setAccessToken,
        avatarURL: avatarURL,
        setAvatarURL: setAvatarURL,

        loginUser: loginUser,
        registerUser: registerUser,
        logoutUser: logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <MyLoader/> : children}
        </AuthContext.Provider>
    );
};