import { useState } from "react";

import Image from "next/image";

import { Card, Text, Button, Group, Center } from "@mantine/core";
import { IconShoppingCartPlus } from "@tabler/icons-react";

import placeholder from "../public/placeholder.svg";

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
        <ProductImage img={img} height={240} width={200} />
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

const ProductImage = ({ img, height, width }) => {
  if (img) {
    return (
      <Image
        src={img}
        alt="product image"
        height={height}
        width={width}
        quality={100}
        style={{ objectFit: "contain" }}
      />
    );
  }

  return (
    <Center h={height} w={width}>
      <Image
        src={placeholder}
        alt="product image"
        height={60}
        width={50}
        style={{ objectFit: "contain" }}
      />
    </Center>
  );
};

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
        <Text size="md" weight={500} c="green">
          -{Math.round(100 - ((price - discount) / price) * 100)}%
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
