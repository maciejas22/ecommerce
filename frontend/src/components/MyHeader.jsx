import { useState, useEffect } from "react";

import {
  Header,
  Button,
  Group,
  Flex,
  Divider,
  Burger,
  Drawer,
  Container,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { IconShoppingCart } from "@tabler/icons-react";

import SearchBar from "./SearchBar";
import User from "./User";
import Categories from "./Categories";

const MyHeader = ({ categories }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowWidth > 1080) {
    return (
      <Header mb="xs" height={"116px"}>
        <Container size="xl">
          <Flex align="center" justify="space-between" p={"12px"}>
            <SearchBar widthPercentage={"40%"} padding={"0"} />

            <Group>
              <Button variant="outline">
                <IconShoppingCart size={20} stroke={1.5} />
              </Button>

              <User width={windowWidth} />
            </Group>
          </Flex>
        </Container>

        <Divider />

        <Container size="xl">
          <Group px="md" position="apart">
            <Categories categories={categories} />
          </Group>
        </Container>
      </Header>
    );
  } else {
    return (
      <Header
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        height={"116px"}
        mb="xs"
      >
        <Flex align="center" justify="space-between" p={"12px"} width={"100%"}>
          <Burger opened={opened} onClick={open} />
          <Group>
            <Button variant="outline">
              <IconShoppingCart size={20} stroke={1.5} />
            </Button>
            <User width={windowWidth} />
          </Group>
        </Flex>
        <SearchBar widthPercentage={"100%"} padding={"0 12px"} />

        <Drawer opened={opened} onClose={close}>
          <Flex direction="column" align="flex-start">
            <Categories categories={categories} closeDrawer={close} />
          </Flex>
        </Drawer>
      </Header>
    );
  }
};

export default MyHeader;
