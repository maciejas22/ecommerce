import {Button, Container, Divider, Flex, PasswordInput, Space, Title,} from "@mantine/core";
import {useForm} from "@mantine/form";
import {notifications} from "@mantine/notifications";
import useAxios from "@/utils/useAxios";
import {myJSONformatter} from "@/utils/myJSONformatter";

const ChangePassword = () => {
    const api = useAxios();
    const form = useForm({
        initialValues: {
            old_password: "",
            new_password: "",
            confirmNewPassword: "",
        },
        validate: {
            new_password: (value, values) => {
                if (value.length < 8) {
                    return "Password must be at least 8 characters";
                }
                if (value === values.old_password) {
                    return "New password must be different from the old one";
                }
                if (value !== values.confirmNewPassword) {
                    return "Passwords do not match";
                }
            },
            confirmNewPassword: (value, values) => {
                if (value.length < 8) {
                    return "Password must be at least 8 characters";
                }
                if (value === values.old_password) {
                    return "New password must be different from the old one";
                }
                if (value !== values.new_password) {
                    return "Passwords do not match";
                }
            }
        },
    });
    const changeUserPassword = async (form, values) => {
        const body = {
            old_password: values.old_password,
            new_password: values.new_password,
        }

        return await api
            .put("profile/update_password/", body)
            .then((response) => {
                notifications.show({
                    title: "Success",
                    message: 'Password changed successfully',
                    color: "green",
                })
            })
            .catch((error) => {
                if (error.response.data) {
                    if (error.response.data) {
                        error.response.data.confirmNewPassword = error.response.data.old_password
                    }
                    let data = myJSONformatter(error.response.data);
                    form.setErrors(data);
                }
            });
    }


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
                    {...form.getInputProps("old_password")}
                />

                <Space h="xl"/>
                <Divider mt="xl" mb="xl"/>
                <Space h="xl"/>

                <PasswordInput
                    label="New Password"
                    name="newPassword"
                    placeholder="Enter your new password"
                    {...form.getInputProps("new_password")}
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
