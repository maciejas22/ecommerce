import Link from "next/link";

import { Title, Text, Button, Container, Group } from "@mantine/core";

const ErrorPage = () => {
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
        500
      </Title>
      <Title
        align="center"
        sx={{
          fontSize: "2.5rem",
          fontWeight: 900,
          padding: "1rem 0",
        }}
      >
        Something bad just happened...
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
        Our servers could not handle your request. Please try again later.
      </Text>
      <Group position="center">
        <Button
          variant="subtle"
          onClick={() => window.location.reload()}
          size="md"
          sx={{ margin: "2rem 0" }}
        >
          Refresh Page
        </Button>
      </Group>
    </Container>
  );
};

export default ErrorPage;
