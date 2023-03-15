import { Container, Group, Title, Select, SimpleGrid } from "@mantine/core";
import { IconArrowsSort } from "@tabler/icons-react";
import { useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import img from "../assets/donwload.png";

const CategoryPage = () => {
  const { category } = useParams();

  let items = [
    { img: img, name: "Iphone 14 pro", price: "999", discount: "0" },
    { img: img, name: "Iphone 14 pro Max", price: "1099", discount: "0" },
    { img: img, name: "Iphone 14", price: "999", discount: "0" },
    { img: img, name: "Iphone 14 Max", price: "999", discount: "100" },
    { img: img, name: "Iphone 14 Max", price: "999", discount: "0" },
  ];

  return (
    <>
      <Container size="xl">
        <Group
          py={10}
          position="center"
          sx={{
            width: "100%",
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",

            "@media (max-width: 768px)": {
              justifyContent: "center",
            },
          }}
        >
          <Title order={1}>{category}</Title>
          <Select
            placeholder="Sort by"
            icon={<IconArrowsSort />}
            data={[
              { label: "Price: Low to High", value: "price-low-to-high" },
              { label: "Price: High to Low", value: "price-high-to-low" },
              { label: "Name: A to Z", value: "name-a-to-z" },
              { label: "Name: Z to A", value: "name-z-to-a" },
            ]}
            sx={{
              "@media (max-width: 768px)": {
                width: "100%",
              },
            }}
          />
        </Group>
        <SimpleGrid
          spacing="lg"
          breakpoints={[
            { minWidth: "sm", cols: 2 },
            { minWidth: "md", cols: 3 },
            { minWidth: "lg", cols: 4 },
          ]}
        >
          {items.map((item, index) => (
            <ProductCard
              key={index}
              img={item.img}
              name={item.name}
              price={item.price}
              discount={item.discount}
            />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default CategoryPage;
