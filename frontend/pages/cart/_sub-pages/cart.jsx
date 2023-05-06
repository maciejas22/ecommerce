import dynamic from "next/dynamic";
import {Title} from "@mantine/core";
import MyLoader from "@/components/MyLoader";

const ItemSegment = dynamic(() => import("@/components/Cart/ItemSegment"), {ssr: false, loading: () => <MyLoader/>,});

const Cart = ({nextStep, items, addItem, updateQuantity, deleteItem}) => {
    return (
        <>
            <Title order={1}>Cart:</Title>

            <ItemSegment items={items}
                         addItem={addItem}
                         updateQuantity={updateQuantity}
                         deleteItem={deleteItem}
                         nextStep={nextStep}
            />
        </>
    );
};

export default Cart;