import {useContext, useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {IconHome, IconKey, IconNews, IconUser} from "@tabler/icons-react";

import MyNavbar from "@/components/Account/MyNavbar";
import MyLoader from "@/components/MyLoader";
import AuthContext from "@/context/AuthProvider";
import CartContext from "@/context/CartProvider";
import useAxios from "@/utils/useAxios";

const CSRConfig = {
    ssr: true,
    loading: () => <MyLoader/>,
}
const Account = dynamic(() => import("./Account"), {...CSRConfig});
const Address = dynamic(() => import("./Address"), {...CSRConfig});
const ChangePassword = dynamic(() => import("./ChangePassword"), {...CSRConfig});
const OrderHistory = dynamic(() => import("./OrderHistory"), {...CSRConfig});

const Index = () => {
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState();
    const {accessToken} = useContext(AuthContext);
    const [history, setHistory] = useState([]);
    const {getHistory} = useContext(CartContext);

    const [active, setActive] = useState(0);
    const data = [
        {
            label: "Account",
            icon: <IconUser stroke={1.5}/>,
            element: <Account userState={[user, setUser]}/>,
        },
        {
            label: "Address",
            icon: <IconHome stroke={1.5}/>,
            element: <Address userState={[user, setUser]}/>,
        },
        {
            label: "Password",
            icon: <IconKey stroke={1.5}/>,
            element: <ChangePassword/>,
        },
        {
            label: "Orders History",
            icon: <IconNews stroke={1.5}/>,
            element: <OrderHistory history={history}/>,
        }
    ];

    const api = useAxios();
    const getUserData = async () => {
        const response = api
            .get("profile/")
            .then((response) => {
                return response.data;
            })

        return response;
    };

    useEffect(() => {
        setLoading(true);
        const fetchUserData = async () => {
            try {
                const userData = await getUserData();
                setUser(userData);
                const userHistory = await getHistory();
                setHistory(userHistory);
            } catch (error) {
                console.log(error)
            }
        }

        if (accessToken) {
            fetchUserData().then(() => setLoading(false));
        }
    }, [accessToken]);

    return (
        <>
            <MyNavbar active={active} setActive={setActive} data={data}/>
            {loading ? null : data[active].element}
        </>
    );
};


export default Index;
