import { Container, Group, Title, Select, SimpleGrid } from "@mantine/core";
import { IconArrowsSort } from "@tabler/icons-react";

import axios from "axios";

import ProductCard from "@/components/ProductCard";
import ProductSegment from "@/components/ProductSegment";

const categories = [
  { name: "TVs", slug: "tvs" },
  { name: "Audio", slug: "audio" },
  { name: "Smartphones", slug: "smartphones" },
  { name: "Computers", slug: "computers" },
  { name: "Consoles and games", slug: "consoles-and-games" },
  { name: "Fridges", slug: "fridges" },
  { name: "Microwaves", slug: "microwaves" },
  { name: "Washing machines", slug: "washing-machines" },
];

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "tvs" } },
      { params: { id: "audio" } },
      { params: { id: "smartphones" } },
      { params: { id: "computers" } },
      { params: { id: "consoles-and-games" } },
      { params: { id: "fridges" } },
      { params: { id: "microwaves" } },
      { params: { id: "washing-machines" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/${params.id}/`);
    const data = response.data;
    return {
      props: {
        name: categories.find((category) => category.slug === params.id).name,
        data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        name: "",
        data: [],
      },
    };
  }
}

export default function Category({ name, data }) {
  return <ProductSegment title={name} items={data} />;
}
