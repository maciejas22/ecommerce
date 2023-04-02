import { Container, Group, Divider } from "@mantine/core";
import Link from "next/link";

const MyFooter = () => {
  return (
    <>
      <Divider mt="xs" />
      <Container size="xl" px="sm">
        <Group position="right" my="xs">
          <Link href="/contact">Contact</Link>
          <Link href="/terms-and-conditions">Terms And Conditions</Link>
        </Group>
      </Container>
    </>
  );
};

export default MyFooter;
