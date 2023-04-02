import Link from "next/link";

import { Title, Text, Button, Container, Group } from "@mantine/core";

const NotFound = () => {
  return (
    <Container py="xl">
      <Title
        align="center"
        color="dimmed"
        sx={{
          fontSize: "10rem",
          fontWeight: 900,
          lineHeight: 1,
          padding: "3rem 0",
        }}
      >
        404
      </Title>
      <Title
        align="center"
        sx={{
          fontSize: "2.5rem",
          fontWeight: 900,
          padding: "1rem 0",
        }}
      >
        Oops! That page can’t be found.
      </Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        sx={{
          maxWidth: "31rem",
          margin: `auto`,
        }}
      >
        It looks like nothing was found at this location.
      </Text>
      <Group position="center">
        <Link href={"/"}>
          <Button variant="subtle" size="md" sx={{ margin: "2rem 0" }}>
            Take me back to home page
          </Button>
        </Link>
      </Group>
    </Container>
  );
};

export default NotFound;
