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
import {useContext, useState} from "react";
import AuthContext from "@/context/AuthProvider";


const Account = ({userState}) => {
    const {setUserName, setAvatarURL} = useContext(AuthContext);
    const [user, setUser] = userState;
    const api = useAxios();
    const updateUser = async (form, values) => {
        const {first_name, last_name, avatar, username, email} = values;
        const data = {first_name, last_name, avatar, username, email}
        let formData = new FormData();
        Object.entries(data).forEach(([key, value]) => formData.append(key, value));
        file ? formData.set("avatar", file) : formData.delete("avatar");

        return await api
            .put("profile/", formData)
            .then((response) => {
                setUser(response.data);
                setUserName(response.data.username);
                setAvatarURL(response.data.avatar);
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
            avatar: user?.avatar,
            username: user.username,
            email: user.email,
        },
    });
    const [avatar, setAvatar] = useState(user?.avatar);
    const [file, setFile] = useState(null);

    return (
        <Container>
            <form onSubmit={form.onSubmit((values) => updateUser(form, values))}>
                <Flex justify="center" my="xl">
                    <Title>Edit Profile</Title>
                </Flex>
                <Flex justify="center" my="xl">
                    <FileButton onChange={(f) => {
                        setFile(f);
                        setAvatar(URL.createObjectURL(f));
                    }} accept="image/png, image/jpeg, image/jpg">
                        {(props) => <UnstyledButton  {...props}>
                            <Avatar size={150} radius={150} src={avatar}/>
                        </UnstyledButton>}
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
