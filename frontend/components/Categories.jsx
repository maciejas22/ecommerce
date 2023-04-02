import { Button } from "@mantine/core";
import Link from "next/link";

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

const Categories = ({ closeDrawer }) => {
  return (
    <>
      {categories.map((category, index) => (
        <Link href={"/categories/" + category.slug} key={index}>
          <Button
            variant="subtle"
            sx={{ margin: "6px 0" }}
            onClick={closeDrawer}
          >
            {category.name}
          </Button>
        </Link>
      ))}
    </>
  );
};

export default Categories;
