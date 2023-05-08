import {useRouter} from "next/router";
import {useContext, useEffect} from "react";
import AuthContext from "@/context/AuthProvider";

const withAuth = (Component) => {
    const Auth = (props) => {
        const router = useRouter();
        const {accessToken} = useContext(AuthContext);

        useEffect(() => {
            if (!accessToken) router.push("/account/login");
        }, [accessToken, router]);

        return <Component {...props} />;
    }

    return Auth;
};

export default withAuth;