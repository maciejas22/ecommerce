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
import { useForm } from "@mantine/form";

import AuthContext from "../../context/AuthProvider";

const Account = ({ user }) => {
  const { updateUser } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      // img: user?.img,
      username: user?.username,
      email: user?.email,
      address: {
        street: user?.address?.street,
        number: user?.address?.number === null ? "" : user?.address?.number,
        apartment_number:
          user?.address?.apartment_number === null
            ? ""
            : user?.address?.apartment_number,
        city: {
          name: user?.address?.city?.name,
          postal_code: user?.address?.city?.postal_code,
          country: {
            name: user?.address?.city?.country?.name,
          },
        },
      },
    },
  });

  return (
    <Container>
      <form onSubmit={(e) => updateUser(e)}>
        <Flex justify="center" my="xl">
          <Title>Edit Profile</Title>
        </Flex>
        <Flex justify="center" my="xl">
          <FileButton>
            {(props) => (
              <UnstyledButton {...props}>
                <Avatar size={150} radius={150} src={null} />
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
          <TextInput
            label="First Name"
            name="first_name"
            placeholder="First name"
            {...form.getInputProps("first_name")}
          />
          <TextInput
            label="Last Name"
            name="last_name"
            placeholder="Last name"
            {...form.getInputProps("last_name")}
          />
        </SimpleGrid>
        <TextInput
          label="Username"
          name="username"
          placeholder="Username"
          mt="md"
          {...form.getInputProps("username")}
        />
        <TextInput
          label="Email"
          name="email"
          placeholder="Email"
          mt="md"
          {...form.getInputProps("email")}
        />

        <Space h="xl" />
        <Flex justify="center">
          <Button variant="filled" mt="xl" fullWidth type="submit">
            Save
          </Button>
        </Flex>
      </form>
    </Container>
  );
};

export default Account;
