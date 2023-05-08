import axios from "axios";

const NEXT_PUBLIC_BASE_URL = process.env.BASE_URL;

const axiosInstance = axios.create({
    baseURL: NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})

axiosInstance.interceptors.response.use(
    res => res,
    error => {
        console.log(error);
        throw error;
    }
)
export default axiosInstance;