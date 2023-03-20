import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

const Categories = ({ categories, closeDrawer }) => {
  return (
    <>
      {categories.map((category, index) => (
        <Link to={"/" + category.slug} key={index}>
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
