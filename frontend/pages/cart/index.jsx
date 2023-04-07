import dynamic from "next/dynamic";
import {useContext, useEffect, useState} from "react";

import {Container, Title} from "@mantine/core";
import AuthContext from "@/context/AuthProvider";
import CartContext from "@/context/CartProvider";
import MyLoader from "@/components/MyLoader";

const ItemSegment = dynamic(() => import("@/components/Cart/ItemSegment"), {ssr: false, loading: () => <MyLoader/>,});
const Index = () => {
    const [loading, setLoading] = useState(true);
    const {authTokens} = useContext(AuthContext);
    const {items, getCart, addItem, updateQuantity, deleteItem,} = useContext(CartContext);

    useEffect(() => {
        setLoading(true);
        const fetchItems = async () => {
            try {
                await getCart();
            } catch (error) {
                console.log(error);
            }
        };

        if (authTokens) {
            fetchItems();
            setLoading(false);
        }
    }, [authTokens]);

    return (
        <Container size="xl"
                   px='md'
                   sx={{
                       '@media (max-width: 1080px)': {
                           padding: '0px'
                       }
                   }}
        >
            <Title order={1}>Cart:</Title>

            {loading ? null : <ItemSegment items={items}
                                           addItem={addItem}
                                           updateQuantity={updateQuantity}
                                           deleteItem={deleteItem}/>
            }
        </Container>
    );
};

export default Index;
