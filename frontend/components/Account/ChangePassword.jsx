import {useContext} from "react";

import {Button, Container, Divider, Flex, PasswordInput, Space, Title,} from "@mantine/core";
import {useForm} from "@mantine/form";

import AuthContext from "../../context/AuthProvider";

const ChangePassword = () => {
    const {changeUserPassword} = useContext(AuthContext);

    const form = useForm({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        validate: {
            newPassword: (value, values) => {
                if (value.length < 8) {
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
            <form onSubmit={form.onSubmit((values) => changeUserPassword(form, values))}>
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

                <Space h="xl"/>
                <Divider mt="xl" mb="xl"/>
                <Space h="xl"/>

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
                <Flex justify="center">
                    <Button variant="filled" mt="xl" fullWidth type="submit">
                        Save
                    </Button>
                </Flex>
            </form>
        </Container>
    );
};

export default ChangePassword;
