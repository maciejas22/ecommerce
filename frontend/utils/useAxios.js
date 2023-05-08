import {useContext} from "react";
import axios from "axios";
import AuthContext from "@/context/AuthProvider";
import jwt_decode from "jwt-decode";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const useAxios = () => {
    const {accessToken, setAccessToken, userName, setUserName, logoutUser} = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL: BASEURL,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        }
    })

    axiosInstance.interceptors.request.use(async req => {
        if (accessToken === null) return req;
        
        const exp = jwt_decode(accessToken).exp;
        const isExpired = Date.now() >= exp * 1000;
        if (!isExpired) return req;

        const res = await axios.post(`${BASEURL}token/refresh/`, {
            withCredentials: true
        });

        let token = res.data.access;
        setAccessToken(token);
        setUserName(jwt_decode(token).username);

        req.headers["Authorization"] = `Bearer ${token}`;
        return req;
    })

    axiosInstance.interceptors.response.use(
        res => res,
        error => {
            console.log(error);
            throw error;
        }
    )

    return axiosInstance;
}

export default useAxios;