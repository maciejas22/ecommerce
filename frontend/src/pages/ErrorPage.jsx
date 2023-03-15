import { useRouteError } from "react-router-dom";

import { Link } from "react-router-dom";

import { Title, Text, Button, Container, Group } from "@mantine/core";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
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
        {error.statusText}
      </Title>
      <Title
        align="center"
        sx={{
          fontSize: "2.5rem",
          fontWeight: 900,
          padding: "1rem 0",
        }}
      >
        Oops!
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
        Sorry, an unexpected error has occurred.
      </Text>
      <Group position="center">
        <Link to={"/"}>
          <Button variant="subtle" size="md" sx={{ margin: "2rem 0" }}>
            Take me back to home page
          </Button>
        </Link>
      </Group>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        sx={{
          margin: `auto`,
        }}
      >
        {error.message}
      </Text>
    </Container>
  );
};

export default ErrorPage;
