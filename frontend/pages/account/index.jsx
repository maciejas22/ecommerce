import dynamic from "next/dynamic";
import {useContext, useEffect, useState} from "react";

import {IconHome, IconKey, IconNews, IconUser} from "@tabler/icons-react";
import MyNavbar from "@/components/Account/MyNavbar";
import MyLoader from "@/components/MyLoader";
import AuthContext from "@/context/AuthProvider";
import CartContext from "@/context/CartProvider";

const CSRConfig = {
    ssr: false,
    loading: () => <MyLoader/>,
}

const Account = dynamic(() => import("@/components/Account/Account"), {...CSRConfig});
const Address = dynamic(() => import("@/components/Account/Address"), {...CSRConfig});
const ChangePassword = dynamic(() => import("@/components/Account/ChangePassword"), {...CSRConfig});
const OrderHistory = dynamic(() => import("@/components/Account/OrderHistory"), {...CSRConfig});
const Index = () => {
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState();
    const {authTokens, getUserData} = useContext(AuthContext);
    const [history, setHistory] = useState([]);
    const {getHistory} = useContext(CartContext);

    const [active, setActive] = useState(0);
    const data = [
        {
            label: "Account",
            icon: <IconUser stroke={1.5}/>,
            element: <Account user={user}/>,
        },
        {
            label: "Address",
            icon: <IconHome stroke={1.5}/>,
            element: <Address user={user}/>,
        },
        {
            label: "Password",
            icon: <IconKey stroke={1.5}/>,
            element: <ChangePassword user={user}/>,
        },
        {
            label: "Orders History",
            icon: <IconNews stroke={1.5}/>,
            element: <OrderHistory history={history}/>,
        }
    ];

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

        if (authTokens) {
            fetchUserData();
            setLoading(false);
        }
    }, [authTokens]);

    return (
        <>
            <MyNavbar active={active} setActive={setActive} data={data}/>
            {loading ? null : data[active].element}
        </>
    );
};


export default Index;
