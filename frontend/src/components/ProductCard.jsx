import { Card, Text, Image, Button, Group } from "@mantine/core";
import { IconShoppingCartPlus } from "@tabler/icons-react";

const ProductCard = ({ img, name, price, discount }) => {
  return (
    <Card shadow="xl" withBorder radius="md" width={220} my="xs">
      <Card.Section
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
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

      <Group position="apart">
        <ProductPrice price={price} discount={discount} />
        <Button variant="outline" size="xs" radius="xl">
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
