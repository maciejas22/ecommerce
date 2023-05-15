import {useState} from 'react'
import {Button, Flex, Group, Image, Select, Text} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ProductPrice = ({price, discount}) => {
    if (discount > 0) {
        return (
            <Group spacing="xs">
                <Text size="md" weight={500}>
                    {(price - discount).toFixed(2)}$
                </Text>
                <Text size="md" weight={500} c="dimmed" td="line-through">
                    {price}$
                </Text>
            </Group>
        );
    } else {
        return (
            <Text size="md" weight={500}>
                {price.toFixed(2)}$
            </Text>
        );
    }
};
export default function ItemMobile({
                                       index,
                                       id,
                                       product_thumbnail,
                                       name,
                                       price,
                                       discount,
                                       quantity,
                                       updateQuantity,
                                       deleteItem
                                   }) {
    const [value, setValue] = useState(quantity);

    const handleQuantityChange = (id, newValue) => {
        setValue(newValue);
        updateQuantity(id, parseInt(newValue));
    };

    const handleDelete = (id) => {
        deleteItem(id);
    };

    let img_url = product_thumbnail ? BASE_URL.slice(0, -5) + product_thumbnail : null
    return (
        <Flex direction="row" align="center" py="xs">
            <Image
                src={img_url}
                width={70}
                height={84}
                alt="product image"
                fit="contain"
                withPlaceholder
            />
            <div style={{
                flex: 1,
                paddingLeft: 16,
            }}>
                <Group position="apart">
                    <Text>{name}</Text>
                    <Button size='md' variant='outline' onClick={() => handleDelete(id)}>
                        <IconTrash size={22} stroke={1.5}/>
                    </Button>
                </Group>

                <Group position="apart">
                    <Select
                        data={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                        value={value.toString()}
                        onChange={(newValue) => handleQuantityChange(id, newValue)}
                        size="md"
                        style={{width: 80}}
                    />
                    <ProductPrice price={price} discount={discount}/>
                </Group>
            </div>
        </Flex>
    );
}