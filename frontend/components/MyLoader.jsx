import { Container, Center, Loader } from "@mantine/core";
import React from "react";

const MyLoader = () => {
  return (
    <Container size="xl">
      <Center h={"90vh"}>
        <Loader />
      </Center>
    </Container>
  );
};

export default MyLoader;
