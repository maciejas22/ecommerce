import dynamic from "next/dynamic";
import {useContext, useEffect, useState} from "react";

import {Container, Space, Stepper} from "@mantine/core";
import MyLoader from "@/components/MyLoader";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import CartContext from "@/context/CartProvider";
import useAxios from "@/utils/useAxios";

const CSRConfig = {
    ssr: false,
    loading: () => <MyLoader/>,
}

const Cart = dynamic(() => import("./cart"), {...CSRConfig});
const Address = dynamic(() => import("./address"), {...CSRConfig});
const Pay = dynamic(() => import("./finalize"), {...CSRConfig});

const Index = () => {
    const [activeStep, setActiveStep] = useState(0);
    const nextStep = () => setActiveStep((current) => (current < 2 ? current + 1 : current));
    const prevStep = () => setActiveStep((current) => (current > 0 ? current - 1 : current));

    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState();
    const {items, getCart, addItem, updateQuantity, deleteItem} = useContext(CartContext);
    const elements = [
        {
            label: "Cart",
            element: <Cart nextStep={nextStep}
                           items={items}
                           addItem={addItem}
                           updateQuantity={updateQuantity}
                           deleteItem={deleteItem}
            />,
        },
        {
            label: "Address",
            element: <Address nextStep={nextStep}
                              prevStep={prevStep}
                              address={address}
                              setAddress={setAddress}
            />,
        },
        {
            label: "Payment",
            element:
                <PayPalScriptProvider options={{
                    "client-id": "AYRvQgauDWaOK8zEndYu5dAQRn4k_y6QEsZkh1e6re5OsDh2esyl-b399fHX-pVp1O8yZYNJW-ngxfkS",
                    components: "buttons"
                }}>
                    <Pay prevStep={prevStep}
                         items={items}
                         address={address}
                    />
                </PayPalScriptProvider>,
        }
    ]

    const api = useAxios();
    const getUserData = async () => {
        return api
            .get("profile/")
            .then((response) => {
                return response.data;
            });
    };

    useEffect(() => {
        setLoading(true);
        const fetchItems = async () => {
            try {
                await getCart();
                await getUserData().then((data) => setAddress(data?.address));
            } catch (error) {
                console.log(error);
            }
        };
        fetchItems().then(() => setLoading(false));
    }, []);

    return (
        <Container size="xl"
                   px='md'
                   sx={{
                       '@media (max-width: 1080px)': {
                           padding: '0px'
                       }
                   }}
        >
            <Space h="xl"/>
            <Stepper active={activeStep} radius='md' py='12'>
                <Stepper.Step label='First Step' description='Add products to cart'/>
                <Stepper.Step label='Second Step' description='Add shipping address'/>
                <Stepper.Step label='Third Step' description='Pay'/>
            </Stepper>
            <Space h="xl"/>

            {loading ? <MyLoader/> : elements[activeStep].element}
        </Container>
    );
};

export default Index;
