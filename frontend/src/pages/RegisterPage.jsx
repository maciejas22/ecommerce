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
import { IconUser, IconUsers, IconAt, IconLock } from "@tabler/icons-react";

import AuthContext from "../context/AuthProvider";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      first_name: (value) =>
        value.length < 2 ? "First name must be at least 2 characters" : null,
      last_name: (value) =>
        value.length < 2 ? "Last name must be at least 2 characters" : null,
      username: (value) =>
        value.length < 2 ? "Username must be at least 2 characters" : null,
      email: (value) => (!/^\S+@\S+$/.test(value) ? "Invalid email" : null),
      password: (value, values) => {
        if (value.length < 2) {
          return "Password must be at least 2 characters";
        }
        if (value !== values.confirmPassword) {
          return "Passwords do not match";
        }
      },
      confirmPassword: (value, values) => {
        if (value.length < 2) {
          return "Password must be at least 2 characters";
        }
        if (value !== values.password) {
          return "Passwords do not match";
        }
      },
    },
  });

  return (
    <Container size={420} my={40}>
      <Title align="center">Create Account</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account? <Link to={"/login"}>Login</Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={(e) => registerUser(e)}>
          <TextInput
            label="Fist name"
            name="first_name"
            placeholder="Your First Name"
            my="xs"
            icon={<IconUser stroke={1.5} size={"1rem"} />}
            {...form.getInputProps("first_name")}
          />
          <TextInput
            label="Last name"
            name="last_name"
            placeholder="Your Last Name"
            my="xs"
            icon={<IconUsers stroke={1.5} size={"1rem"} />}
            {...form.getInputProps("last_name")}
          />
          <TextInput
            label="Username"
            name="username"
            placeholder="Your Username"
            my="xs"
            icon={<IconUser stroke={1.5} size={"1rem"} />}
            required
            {...form.getInputProps("username")}
          />
          <TextInput
            label="Email"
            name="email"
            placeholder="Your Email"
            my="xs"
            icon={<IconAt stroke={1.5} size={"1rem"} />}
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            name="password"
            placeholder="Your password"
            my="xs"
            icon={<IconLock stroke={1.5} size={"1rem"} />}
            required
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Confirm Password"
            name="password2"
            placeholder="Confirm your password"
            my="xs"
            icon={<IconLock stroke={1.5} size={"1rem"} />}
            required
            {...form.getInputProps("confirmPassword")}
          />
          <Space h="xl" />
          <Button type="submit" fullWidth mt="xl">
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
