import {createContext, useEffect, useState} from "react";

import {useLocalStorage} from "@mantine/hooks";

import {useRouter} from "next/router";

import jwt_decode from "jwt-decode";

import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
    const router = useRouter();

    const [authTokens, setAuthTokens, removeAuthTokens] = useLocalStorage({
        key: "authTokens",
        defaultValue: null,
    });
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (authTokens !== null) {
            const decoded = jwt_decode(authTokens.refresh).username;
            setUser(decoded);
        }
    }, [authTokens]);

    const registerUser = async (form, values) => {
        const body = {
            first_name: values.first_name || "",
            last_name: values.last_name || "",
            username: values.username,
            email: values.email,
            password: values.password,
        };

        const response = await axios
            .post("http://localhost:8000/api/profile/", JSON.stringify(body), {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                router.push("/account/login");
            })
            .catch((error) => {
                console.log(error.response);
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
        const response = await axios
            .post("http://localhost:8000/api/token/", JSON.stringify(body), {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setAuthTokens(response.data);
                setUser(jwt_decode(response.data.refresh).username);
                router.push("/");
            })
            .catch((error) => {
                console.log(error);
                form.setErrors({
                    username: "Invalid Credentials",
                    password: "Invalid Credentials",
                });
            });
    };

    const logoutUser = () => {
        removeAuthTokens();
        setAuthTokens(null);
        setUser(null);
        router.push("/");
    };

    const changeUserPassword = async (form, values) => {
        const body = {
            old_password: values.oldPassword,
            new_password: values.newPassword,
        }

        const response = await axios
            .put("http://localhost:8000/api/profile/update_password/", JSON.stringify(body), {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authTokens?.access}`,
                },
            })
            .then((response) => {
                console.log(response);
                logoutUser();
            })
            .catch((error) => {
                console.log(error);
                form.setErrors(error.response.data);
            });
        return response;
    }


    const updateUser = async (form, values) => {
        const body = {
            first_name: values.first_name || "",
            last_name: values.last_name || "",
            username: values.username,
            email: values.email,
        };

        const response = await axios
            .put("http://127.0.0.1:8000/api/profile/", JSON.stringify(body), {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authTokens?.access}`,
                },
            })
            .then((response) => {
                console.log(response);
                return getUserData();
            })
            .catch((error) => {
                console.log(JSON.stringify(body));
                console.log(error);
                logoutUser();
                return null;
            });

        return response;
    };

    const updateAddress = async (form, values) => {
        const body = {
            address: {
                street: values.address.street || "",
                number: values.address.number ? parseInt(values.address.number) : null,
                apartment_number: values.address.apartment_number
                    ? parseInt(values.address.apartment_number)
                    : null,
                city: {
                    name: values.address.city.name || "",
                    postal_code: values.address.city.postal_code || "",
                    country: {
                        name: values.address.city.country.name || "",
                    },
                },
            },
        };

        const response = await axios
            .put("http://127.0.0.1:8000/api/profile/", JSON.stringify(body), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authTokens?.access}`,
                },
            })
            .then((response) => {
                console.log(response);
                return getUserData();
            })
            .catch((error) => {
                console.log(error);
                logoutUser();
                return null;
            });

        return response;
    };

    const getUserData = async () => {
        const response = axios
            .get("http://localhost:8000/api/profile/", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authTokens?.access}`,
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                logoutUser();
                return null;
            });

        return response;
    };

    const contextData = {
        authTokens: authTokens,
        user: user,

        loginUser: loginUser,
        registerUser: registerUser,
        updateUser: updateUser,
        updateAddress: updateAddress,
        changeUserPassword: changeUserPassword,
        getUserData: getUserData,
        logoutUser: logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
    );
};
