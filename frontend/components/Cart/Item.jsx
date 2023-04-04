import { useState } from "react";
import {
  Image,
  Select,
  Text,
  ActionIcon,
  Group,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

const ProductPrice = ({ price, discount }) => {
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

const Item = ({
  index,
  img,
  name,
  price,
  discount,
  quantity,
  onQuantityChange,
}) => {
  const [value, setValue] = useState(quantity);

  const handleQuantityChange = (newValue) => {
    setValue(newValue);
    onQuantityChange(index, parseInt(newValue));
  };

  return (
    <Group position="apart" py="xs">
      <Group>
        <Image
          src={img}
          width={60}
          height={72}
          alt="product image"
          fit="contain"
          withPlaceholder
        />
        <Text>{name}</Text>
      </Group>

      <Group position="right">
        <ProductPrice price={price} discount={discount} />
        <Select
          data={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
          value={value.toString()}
          onChange={(newValue) => handleQuantityChange(newValue)}
          size="md"
          style={{ width: 80 }}
        />
        <ActionIcon size={42} variant="default">
          <IconTrash size={22} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Group>
  );
};

export default Item;
