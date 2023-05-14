import {Button, Container, Group, SimpleGrid, Text, Textarea, TextInput, Title,} from "@mantine/core";
import {useForm} from "@mantine/form";
import {notifications} from "@mantine/notifications";
import {IconAt, IconMessage, IconUser} from "@tabler/icons-react";
import axios from "axios";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
    baseURL: BASEURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.log(error);
        notifications.show({
            title: "Error",
            message: error?.response?.data?.detail,
            color: "red",
        })
    }
)

const Home = () => {
    const sendMail = async (form, values) => {
        const body = {
            name: values.name,
            email: values.email,
            subject: values.subject,
            message: values.message,
        }

        await axiosInstance
            .post("contact/", JSON.stringify(body))
            .then((response) => {
                notifications.show({
                    title: "Success",
                    message: "Your message has been sent",
                    color: "green",
                })
                form.reset();
            })
    };

    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
        validate: {
            name: (value) =>
                value.length < 2 ? "Name must be at least 2 characters" : null,
            email: (value) => (!/^\S+@\S+$/.test(value) ? "Invalid email" : null),
            subject: (value) =>
                value.length < 2 ? "Subject must be at least 2 characters" : null,
            message: (value) =>
                value.length < 2 ? "Message must be at least 2 characters" : null,
        },
    });

    return (
        <Container size="md">
            <form onSubmit={form.onSubmit((values) => sendMail(form, values))}>
                <Title order={1} weight={900} align="center">
                    Contact Us
                </Title>
                <Text align="center" color="dimmed">
                    Leave your email and we will get back to you as soon as possible.
                </Text>
                <SimpleGrid
                    columns={1}
                    spacing={"md"}
                    mt="md"
                    breakpoints={[{minWidth: "sm", cols: 2}]}
                >
                    <TextInput
                        label="Name"
                        placeholder="Your name"
                        icon={<IconUser stroke={1.5} size={"1rem"}/>}
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label="Email"
                        placeholder="Your email"
                        icon={<IconAt stroke={1.5} size={"1rem"}/>}
                        {...form.getInputProps("email")}
                    />
                </SimpleGrid>
                <TextInput
                    label="Subject"
                    placeholder="Subject"
                    mt="md"
                    icon={<IconMessage stroke={1.5} size={"1rem"}/>}
                    {...form.getInputProps("subject")}
                />
                <Textarea
                    label="Message"
                    placeholder="Message"
                    mt="md"
                    {...form.getInputProps("message")}
                />
                <Group position="center" mt="xl">
                    <Button type="submit" size="md">
                        Send
                    </Button>
                </Group>
            </form>
        </Container>
    );
};

export default Home;
