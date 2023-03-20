import { useContext } from "react";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Space,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link } from "react-router-dom";
import { IconUser, IconLock } from "@tabler/icons-react";

import AuthContext from "../context/AuthProvider";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) =>
        value.length < 2 ? "Username must be at least 2 characters" : null,
      password: (value) =>
        value.length < 2 ? "Password must be at least 2 characters" : null,
    },
  });

  return (
    <Container size={420} my={40}>
      <Title align="center">Welcome back!</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet? <Link to={"/register"}>Create account</Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={(e) => loginUser(e)}>
          <TextInput
            label="Username"
            name="username"
            placeholder="Your Username"
            my="xs"
            icon={<IconUser stroke={1.5} size={"1rem"} />}
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            name="password"
            placeholder="Your password"
            my="xs"
            icon={<IconLock stroke={1.5} size={"1rem"} />}
            {...form.getInputProps("password")}
          />
          <Space h="xl" />
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
