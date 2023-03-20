import { useState, useEffect } from "react";

import { Container, Group, Title, Select, SimpleGrid } from "@mantine/core";
import { IconArrowsSort } from "@tabler/icons-react";

import ProductCard from "../components/ProductCard";

const fetchItems = async (slug) => {
  const response = await fetch(`http://localhost:8000/api/${slug}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const CategoryPage = ({ categoryName, categorySlug }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchItems(categorySlug).then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, [categorySlug]);

  return loading ? null : (
    <>
      <Container size="xl">
        <Group
          py="sm"
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
          <Title order={1}>{categoryName}</Title>
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
