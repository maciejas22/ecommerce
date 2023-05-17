import {useEffect, useState} from "react";
import {Button, Center, Flex, Grid, Group, Stack, Text, Title} from "@mantine/core";
import Item from "@/components/Cart/Item";
import ItemMobile from "@/components/Cart/ItemMobile";
import {IconShoppingCartOff} from "@tabler/icons-react";


export default function ItemSegment({items, addItem, updateQuantity, deleteItem, nextStep}) {
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

    if (!items.length) {
        return (
            <Center>
                <Stack>
                    <Center>
                        <IconShoppingCartOff size={100} stroke={1.5}/>
                    </Center>
                    <Title order={1}>
                        No items in cart found.
                    </Title>
                </Stack>
            </Center>
        );
    }

    return (
        <Grid>
            <Grid.Col md={8} span={12}>
                {items && items.map((item, index) => (
                    windowWidth < 1080 ? (
                        <ItemMobile
                            key={index}
                            index={index}
                            id={item.product_id}
                            product_thumbnail={item.product_thumbnail}
                            name={item.product}
                            price={item.product_price}
                            discount={item.product_discount}
                            quantity={item.quantity}
                            updateQuantity={updateQuantity}
                            deleteItem={deleteItem}
                        />
                    ) : (
                        <Item
                            key={index}
                            index={index}
                            id={item.product_id}
                            product_thumbnail={item.product_thumbnail}
                            name={item.product}
                            price={item.product_price}
                            discount={item.product_discount}
                            quantity={item.quantity}
                            updateQuantity={updateQuantity}
                            deleteItem={deleteItem}
                        />

                    )))}
            </Grid.Col>

            <Grid.Col md={4} span={12} py={5}>
                <Flex direction="column">
                    <Group position="apart">
                        <Text fz="xl">Subtotal:</Text>
                        <Text fz="xl">
                            {items.reduce(
                                (acc, item) =>
                                    acc + (item.product_price - item.product_discount) * item.quantity,
                                0
                            ).toFixed(2)}
                            $
                        </Text>
                    </Group>
                    <Button onClick={nextStep}>Add Shipping address</Button>
                </Flex>
            </Grid.Col>
        </Grid>
    );
}