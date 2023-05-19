import {useEffect, useState} from "react";
import {Accordion, Container, Group, Image, Space, Stack, Text, Title} from "@mantine/core";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const dateConfig = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
}
const Product = ({id, img, name, quantity, price}) => {
    return (
        <>
            <Group position='apart'>
                <Group>
                    <Image fit='contain' src={img} alt={name} width={100} height={100} withPlaceholder/>
                    <Text>{name}</Text>
                </Group>
                <Stack>
                    <Text>Price: {price}$</Text>
                    <Text>Quantity: {quantity}</Text>
                </Stack>
            </Group>
        </>
    );
};

const ProductMobile = ({id, img, name, quantity, price}) => {
    return (
        <>
            <Text>{name}</Text>
            <Group position='apart'>
                <Text>Price: {price}$</Text>
                <Text>Quantity: {quantity}</Text>
            </Group>
        </>
    );
};
export default function OrderHistory({history}) {
    const [windowWidth, setWindowWidth] = useState(9999);

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== "undefined") {
                setWindowWidth(window.innerWidth);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Container size="xl">
            <Title order={1}>Order history: </Title>
            <Space h="xl"/>
            <Accordion variant="separated">
                {history.map((order) => {
                    return (
                        <Accordion.Item key={order.id} value={order.id.toString()}>
                            <Accordion.Control>{new Date(order.created).toLocaleDateString('en-US', dateConfig)}</Accordion.Control>
                            <Accordion.Panel>Status: {order.status}</Accordion.Panel>
                            {order.items.map((product, index) => (
                                windowWidth < 1080 ? (
                                    <Accordion.Panel key={product.id + 1}>
                                        <ProductMobile id={product.product_id} img={BASE_URL.slice(0,-5) + product.product_thumbnail}
                                                       name={product.product}
                                                       quantity={product.quantity} price={product.product_price}/>
                                    </Accordion.Panel>
                                ) : (
                                    <Accordion.Panel key={product.id + 1}>
                                        <Product id={product.product_id} img={BASE_URL.slice(0,-5) + product.product_thumbnail}
                                                 name={product.product}
                                                 quantity={product.quantity} price={product.product_price}/>
                                    </Accordion.Panel>
                                )))}
                            <Accordion.Panel>{
                                'Total: ' +
                                order.items.reduce((acc, item) => {
                                    return acc + item.product_price * item.quantity;
                                }, 0) + '$'
                            }</Accordion.Panel>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </Container>
    );
}
