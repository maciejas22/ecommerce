import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

const Categories = ({ closeDrawer }) => {
  let categories = [
    { name: "TVs", link: "/tvs" },
    { name: "Audio", link: "/audio" },
    { name: "Smartphones", link: "/smartphones" },
    { name: "Computers", link: "/computers" },
    { name: "Consoles and games", link: "/consoles-and-games" },
    { name: "Fridges", link: "/fridges" },
    { name: "Microwaves", link: "/microwaves" },
    { name: "Washing machines", link: "/washing-machines" },
  ];

  return (
    <>
      {categories.map((category, index) => (
        <Link to={category.link} key={index}>
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
