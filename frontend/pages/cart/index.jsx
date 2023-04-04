import {useState, useEffect} from "react";

import {Title, Flex, Group, Button, Text, Grid, Container} from "@mantine/core";

import Item from "@/components/Cart/Item";
import ItemMobile from "@/components/Cart/ItemMobile";

const mockData = [
    {img: null, name: "Item 1", price: 10, discount: 5, quantity: 1},
    {img: null, name: "Item 2", price: 20, discount: 10, quantity: 2},
    {img: null, name: "Item 3", price: 30, discount: 15, quantity: 3},
    {img: null, name: "Item 4", price: 40, discount: 0, quantity: 4},
];

const index = () => {
    const [windowWidth, setWindowWidth] = useState(9999);
    const [items, setItems] = useState(mockData);

    const handleQuantityChange = (index, value) => {
        const newItems = [...items];
        newItems[index].quantity = value;
        setItems(newItems);
    };

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
        <Container size="xl"
                   px='md'
                   sx={{
                       '@media (max-width: 1080px)': {
                           padding: '0px'
                       }
                   }}
        >
            <Title order={1}>Cart:</Title>
            <Grid>
                <Grid.Col md={8} span={12}>
                    {items.map((item, index) => (
                        windowWidth < 1080 ? (
                            <ItemMobile
                                key={index}
                                index={index}
                                {...item}
                                onQuantityChange={handleQuantityChange}
                            />
                        ) : (
                            <Item
                                key={index}
                                index={index}
                                {...item}
                                onQuantityChange={handleQuantityChange}
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
                                        acc + (item.price - item.discount) * item.quantity,
                                    0
                                )}
                                $
                            </Text>
                        </Group>
                        <Button>Pay</Button>
                    </Flex>
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default index;
