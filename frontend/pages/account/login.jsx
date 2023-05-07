import {useContext} from "react";

import Link from "next/link";

import {Button, Container, Paper, PasswordInput, Space, Text, TextInput, Title,} from "@mantine/core";
import {useForm} from "@mantine/form";

import {IconLock, IconUser} from "@tabler/icons-react";

import AuthContext from "@/context/AuthProvider";

const Login = () => {
    const {loginUser} = useContext(AuthContext);

    const form = useForm({
        initialValues: {
            username: "",
            password: "",
        },
        validate: {
            username: (value) =>
                value.length < 2 ? "Username must be at least 8 characters" : null,
            password: (value) =>
                value.length < 8 ? "Password must be at least 8 characters" : null,
        },
    });

    return (
        <Container size={420} my={40}>
            <Title align="center">Welcome back!</Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet?{" "}
                <Link href={"/account/register"}>Create account</Link>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit((values) => loginUser(form, values))}>
                    <TextInput
                        label="Username"
                        name="username"
                        placeholder="Your Username"
                        my="xs"
                        icon={<IconUser stroke={1.5} size={"1rem"}/>}
                        {...form.getInputProps("username")}
                    />
                    <PasswordInput
                        label="Password"
                        name="password"
                        placeholder="Your password"
                        my="xs"
                        icon={<IconLock stroke={1.5} size={"1rem"}/>}
                        {...form.getInputProps("password")}
                    />
                    <Space h="xl"/>
                    <Button type="submit" fullWidth mt="xl">
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
