import { useState, useEffect, useMemo } from "react";

import { Container, Group, Title, Select, SimpleGrid } from "@mantine/core";

import { IconArrowsSort } from "@tabler/icons-react";

import ProductCard from "@/components/ProductCard";

const ProductSegment = ({ title, items }) => {
  const [sort, setSort] = useState("name-a-to-z");

  const sortedProducts = useMemo(() => {
    switch (sort) {
      case "price-low-to-high":
        return items.sort((a, b) => a.price - b.price);
      case "price-high-to-low":
        return items.sort((a, b) => b.price - a.price);
      case "name-a-to-z":
        return items.sort((a, b) => a.name.localeCompare(b.name));
      case "name-z-to-a":
        return items.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return items;
    }
  }, [sort, items]);

  return (
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
          <Title order={1}>{title}</Title>
          <Select
            value={sort}
            onChange={setSort}
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
          {sortedProducts.map((item, index) => (
            <ProductCard key={index} {...item} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default ProductSegment;
