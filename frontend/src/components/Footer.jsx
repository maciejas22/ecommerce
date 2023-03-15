import { Container, Group, Divider } from "@mantine/core";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <Divider mt="xs" />
      <Container size="xl" px="sm">
        <Group position="right" my="xs">
          <Link to="/contact">Contact</Link>
          <Link to="/terms-and-conditions">Terms And Conditions</Link>
        </Group>
      </Container>
    </>
  );
};

export default Footer;
