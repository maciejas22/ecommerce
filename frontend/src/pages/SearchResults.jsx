import { useState, useEffect } from "react";

import { Container, Group, Title, Select, SimpleGrid } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { IconArrowsSort } from "@tabler/icons-react";

import ProductCard from "../components/ProductCard";

const fetchItems = async (query) => {
  const params = new URLSearchParams({ search: query });
  const response = await fetch(
    `http://localhost:8000/api/search/?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        search: query,
      },
    }
  );
  const data = await response.json();
  return data;
};

const SearchResults = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);
  const [search] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    fetchItems(search.get("search")).then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, [search]);

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
          <Title order={1}>
            {'Search results for: "' + search.get("search") + '"'}
          </Title>
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

export default SearchResults;
