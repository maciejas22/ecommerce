import {useContext} from "react";
import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js';
import {Button, Group, SimpleGrid, Space, Stack, Text, Title} from "@mantine/core";
import MyLoader from "@/components/MyLoader";

import CartContext from "@/context/CartProvider";

function createOrder(data, actions, amount) {
    return actions.order.create({
        purchase_units: [
            {
                amount: {
                    value: amount,
                },
            },
        ],
    });
}

function onApprove(data, actions, setStatus) {
    setStatus("PENDING");
    return actions.order.capture();
}

function MyPayPalButton({amount, setStatus}) {
    return (
        <PayPalButtons
            createOrder={(data, actions) => createOrder(data, actions, amount)}
            onApprove={(data, actions) => onApprove(data, actions, setStatus)}
            style={
                {
                    color: 'blue',
                    shape: 'pill',
                    label: 'pay',
                    height: 40,
                    backgroundColor: 'red',
                }
            }
        />
    );
}

export default function Pay({prevStep, items, address}) {
    const {setStatus} = useContext(CartContext);
    const [{isPending}] = usePayPalScriptReducer();
    const amount = items.reduce((acc, item) => {
            return acc + (item.product_price - item.product_discount) * item.quantity
        },
        0)
    if (isPending) return <MyLoader/>
    return (
        <>
            <SimpleGrid
                columns={1}
                spacing="md"
                breakpoints={[{minWidth: "sm", cols: 2}]}
            >
                <Stack>
                    <Stack spacing='xs'>
                        <Title>Adress:</Title>
                        <Text>{address.street} {address.number}{address.apartment_number ? '/' : ''}{address.apartment_number}</Text>
                        <Text>{address.city.postal_code} {address.city.name}</Text>
                        <Text>{address.city.country.name}</Text>
                    </Stack>
                    <Stack spacing='xs'>
                        <Title>Items:</Title>

                        {items.map((item, index) => (
                            <Group position='apart' key={index}>
                                <Text>{item.product}</Text>
                                <Group>
                                    <Text>x{item.quantity}</Text>
                                    <Text>{((item.product_price - item.product_discount) * item.quantity).toFixed(2)}$</Text>
                                </Group>
                            </Group>
                        ))}
                    </Stack>
                </Stack>
                <Stack>
                    <div style={{colorScheme: 'none'}}>
                        <Group position='apart'>
                            <Title>Total:</Title>
                            <Title>
                                {amount.toFixed(2)}$
                            </Title>
                        </Group>
                        <Space h='xl'/>

                        <MyPayPalButton amount={amount} setStatus={setStatus}/>
                    </div>
                    <Button variant="default" onClick={prevStep}>
                        Back
                    </Button>
                </Stack>
            </SimpleGrid>
        </>
    );
}
