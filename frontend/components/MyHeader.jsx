import { useState, useEffect } from "react";

import Link from "next/link";

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

const MyHeader = () => {
  const [windowWidth, setWindowWidth] = useState();
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setWindowWidth(window.innerWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowWidth > 1080) {
    return (
      <Header mb="xs" height={"116px"}>
        <Container size="xl" px="0">
          <Flex align="center" justify="space-between" py="sm" px="md">
            <SearchBar widthPercentage={"40%"} padding={"0"} />

            <Group>
              <Link href="/cart/">
                <Button variant="outline">
                  <IconShoppingCart size={20} stroke={1.5} />
                </Button>
              </Link>

              <User width={windowWidth} />
            </Group>
          </Flex>
        </Container>

        <Divider />

        <Container size="xl">
          <Group px="md" position="apart">
            <Categories />
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
        px="0"
      >
        <Flex
          align="center"
          justify="space-between"
          py="sm"
          px="md"
          width={"100%"}
        >
          <Burger opened={opened} onClick={open} />
          <Group>
            <Link href="/cart/">
              <Button variant="outline">
                <IconShoppingCart size={20} stroke={1.5} />
              </Button>
            </Link>
            <User width={windowWidth} />
          </Group>
        </Flex>
        <SearchBar widthPercentage={"100%"} padding={"0 16px"} />

        <Drawer opened={opened} onClose={close}>
          <Flex direction="column" align="flex-start">
            <Categories closeDrawer={close} />
          </Flex>
        </Drawer>
      </Header>
    );
  }
};

export default MyHeader;
