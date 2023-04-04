import {useState} from 'react'
import {ActionIcon, Flex, Group, Image, Select, Text} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";

const ProductPrice = ({price, discount}) => {
    if (discount > 0) {
        return (
            <Group spacing="xs">
                <Text size="md" weight={500}>
                    {price - discount}$
                </Text>
                <Text size="md" weight={500} c="dimmed" td="line-through">
                    {price}$
                </Text>
            </Group>
        );
    } else {
        return (
            <Text size="md" weight={500}>
                {price}$
            </Text>
        );
    }
};
export default function ItemMobile({
                                       index,
                                       img,
                                       name,
                                       price,
                                       discount,
                                       quantity,
                                       onQuantityChange,
                                   }) {
    const [windowWidth, setWindowWidth] = useState();
    const [value, setValue] = useState(quantity);

    const handleQuantityChange = (newValue) => {
        setValue(newValue);
        onQuantityChange(index, parseInt(newValue));
    };

    return (
        <Flex direction="row" align="center" py="xs">
            <Image
                src={img}
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
                    <ActionIcon size={42} variant="default">
                        <IconTrash size={22} stroke={1.5}/>
                    </ActionIcon>
                </Group>

                <Group position="apart">
                    <Select
                        data={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                        value={value.toString()}
                        onChange={(newValue) => handleQuantityChange(newValue)}
                        size="md"
                        style={{width: 80}}
                    />
                    <ProductPrice price={price} discount={discount}/>
                </Group>
            </div>
        </Flex>
    );
}