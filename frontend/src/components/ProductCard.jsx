import { useState } from "react";

import { Card, Text, Image, Button, Group } from "@mantine/core";
import { IconShoppingCartPlus } from "@tabler/icons-react";

const ProductCard = ({ img, name, price, discount }) => {
  const [variant, setVariant] = useState("outline");

  const handleMouseEnter = () => {
    setVariant("filled");
  };

  const handleMouseLeave = () => {
    setVariant("outline");
  };

  return (
    <Card shadow="xl" withBorder radius="md" width={220} py="lg">
      <Card.Section
        py="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          height={240}
          width={200}
          src={img}
          fit="contain"
          radius="md"
          withPlaceholder
        />
      </Card.Section>

      <Text size="lg" weight={500} color="blue">
        {name}
      </Text>

      <Group position="apart" py="sm">
        <ProductPrice price={price} discount={discount} />
        <Button
          variant={variant}
          size="xs"
          radius="xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <IconShoppingCartPlus size={20} stroke={1.5} />
        </Button>
      </Group>
    </Card>
  );
};

let ProductPrice = ({ price, discount }) => {
  if (discount > 0) {
    return (
      <Group spacing="xs">
        <Text
          size="md"
          weight={500}
          sx={{
            color: "red",
            textDecoration: "line-through",
          }}
        >
          {price}$
        </Text>
        <Text size="md" weight={500} color="green">
          {price - discount}$
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

export default ProductCard;
