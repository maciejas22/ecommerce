"use client";

import { useContext } from "react";

import {
  PasswordInput,
  Flex,
  Title,
  Container,
  Divider,
  Space,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import AuthContext from "../../context/AuthProvider";

const ChangePassword = () => {
  const { changeUserPassword } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validate: {
      password: (value, values) => {
        if (value.length < 2) {
          return "Password must be at least 2 characters";
        }
        if (value !== values.confirmNewPassword) {
          return "Passwords do not match";
        }
      },
    },
  });

  return (
    <Container>
      <form onSubmit={(e) => changeUserPassword(e)}>
        <Flex justify="center" my="xl">
          <Title>Change Password</Title>
        </Flex>
        <PasswordInput
          label="Old Password"
          name="oldPassword"
          placeholder="Enter your old password"
          mt="md"
          {...form.getInputProps("oldPassword")}
        />

        <Space h="xl" />
        <Divider mt="xl" mb="xl" />
        <Space h="xl" />

        <PasswordInput
          label="New Password"
          name="newPassword"
          placeholder="Enter your new password"
          {...form.getInputProps("newPassword")}
        />
        <PasswordInput
          label="Confirm New Password"
          name="confirmNewPassword"
          placeholder="Confirm your new password"
          mt="md"
          {...form.getInputProps("confirmNewPassword")}
        />
      </form>
    </Container>
  );
};

export default ChangePassword;
