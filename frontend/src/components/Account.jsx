import { useContext } from "react";

import {
  Space,
  Divider,
  Button,
  Avatar,
  FileButton,
  Title,
  Flex,
  Container,
  SimpleGrid,
  TextInput,
  UnstyledButton,
} from "@mantine/core";

import AuthContext from "../context/AuthProvider";

const Account = () => {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <Flex justify="center" my="xl">
        <Title>Edit Profile</Title>
      </Flex>
      <Flex justify="center" my="xl">
        <FileButton>
          {(props) => (
            <UnstyledButton {...props}>
              <Avatar size={150} radius={150} src={user.img} />
            </UnstyledButton>
          )}
        </FileButton>
      </Flex>
      <SimpleGrid
        columns={1}
        breakpoints={[{ minWidth: "sm", cols: 2 }]}
        spacing={"md"}
        mt="md"
      >
        <TextInput label="First Name" defaultValue={user.first_name} />
        <TextInput label="Last Name" defaultValue={user.last_name} />
      </SimpleGrid>
      <TextInput label="Username" defaultValue={user.username} mt="md" />
      <TextInput label="Email" defaultValue={user.email} mt="md" />

      <Divider mt="xl" mb="xl" />

      <Flex justify="center" my="xl">
        <Title>Edit Adress</Title>
      </Flex>
      <TextInput
        label="Adress line 1"
        placeholder="Street name and house number"
        mt="md"
      />
      <TextInput
        label="Adress line 2"
        placeholder="Apartment, unit etc."
        mt="md"
      />
      <TextInput label="City" placeholder="City/Town" mt="md" />
      <TextInput label="Zip" placeholder="Postcode/Zip" mt="md" />
      <TextInput label="County" placeholder="Country" mt="md" />

      <Space h="xl" />
      <Flex justify="center">
        <Button variant="filled" mt="xl" fullWidth>
          Save
        </Button>
      </Flex>
    </Container>
  );
};

export default Account;
