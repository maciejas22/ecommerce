import {useState} from "react";
import {Button, Group, Image, Select, Text} from "@mantine/core";
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

const Item = ({
                  index,
                  id,
                  product_thumbnail,
                  name,
                  price,
                  discount,
                  quantity,
                  updateQuantity,
                  deleteItem
              }) => {
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
        <Group position="apart" py="xs">
            <Group>
                <Image
                    src={img_url}
                    width={60}
                    height={72}
                    alt="product image"
                    fit="contain"
                    withPlaceholder
                />
                <Text>{name}</Text>
            </Group>

            <Group position="right">
                <ProductPrice price={price} discount={discount}/>
                <Select
                    data={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                    value={value.toString()}
                    onChange={(newValue) => handleQuantityChange(id, newValue)}
                    size="md"
                    style={{width: 80}}
                />
                <Button size='md' variant='outline' onClick={() => handleDelete(id)}>
                    <IconTrash size={22} stroke={1.5}/>
                </Button>
            </Group>
        </Group>
    );
};

export default Item;
