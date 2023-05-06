import {
    Avatar,
    Button,
    Container,
    FileButton,
    Flex,
    SimpleGrid,
    Space,
    TextInput,
    Title,
    UnstyledButton,
} from "@mantine/core";
import {notifications} from '@mantine/notifications';
import {useForm} from "@mantine/form";

import useAxios from "@/utils/useAxios";
import {myJSONformatter} from "@/utils/myJSONformatter";


const Account = ({userState}) => {
    const [user, setUser] = userState;
    const api = useAxios();
    const updateUser = async (form, values) => {
        const {first_name, last_name, username, email} = values;
        const body = {
            ...(first_name && {first_name}),
            ...(last_name && {last_name}),
            ...(username && {username}),
            ...(email && {email})
        };

        return await api
            .put("profile/", JSON.stringify(body))
            .then((response) => {
                setUser(response.data);
                notifications.show({
                    title: "Success",
                    message: 'Profile updated successfully',
                    color: "green",
                })
            })
            .catch((error) => {
                if (error.response.data) {
                    let data = myJSONformatter(error.response.data);
                    form.setErrors(data);
                }
            });

    };

    const form = useForm({
        initialValues: {
            first_name: user?.first_name,
            last_name: user?.last_name,
            username: user.username,
            email: user.email,
        },
    });

    return (
        <Container>
            <form onSubmit={form.onSubmit((values) => updateUser(form, values))}>
                <Flex justify="center" my="xl">
                    <Title>Edit Profile</Title>
                </Flex>
                <Flex justify="center" my="xl">
                    <FileButton>
                        {(props) => (
                            <UnstyledButton {...props}>
                                <Avatar size={150} radius={150} src={null}/>
                            </UnstyledButton>
                        )}
                    </FileButton>
                </Flex>
                <SimpleGrid
                    columns={1}
                    breakpoints={[{minWidth: "sm", cols: 2}]}
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

                <Space h="xl"/>
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
