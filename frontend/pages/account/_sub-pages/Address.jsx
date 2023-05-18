import {Button, Container, Flex, SimpleGrid, Space, TextInput, Title,} from "@mantine/core";
import {useForm} from "@mantine/form";
import {notifications} from "@mantine/notifications";
import useAxios from "@/utils/useAxios";

import {myJSONformatter} from "@/utils/myJSONformatter";


const Address = ({userState}) => {
    const [user, setUser] = userState;
    const api = useAxios();

    const form = useForm({
        initialValues: {
            address: {
                street: user?.address?.street || '',
                number: user?.address?.number || '',
                apartment_number: user?.address?.apartment_number || '',
                city: {
                    name: user?.address?.city?.name || '',
                    postal_code: user?.address?.city?.postal_code || '',
                    country: {
                        name: user?.address?.city?.country?.name || '',
                    },
                },
            },
        },
    });

    const updateAddress = async (form, values) => {
        const body = {
            address: {
                street: values.address.street || "",
                number: values.address.number ? parseInt(values.address.number) : null,
                apartment_number: values.address.apartment_number
                    ? parseInt(values.address.apartment_number)
                    : null,
                city: {
                    name: values.address.city.name || "",
                    postal_code: values.address.city.postal_code || "",
                    country: {
                        name: values.address.city.country.name || "",
                    },
                },
            },
        };

        return await api
            .put("profile/", JSON.stringify(body), {})
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

    return (
        <Container>
            <form onSubmit={form.onSubmit((values) => updateAddress(form, values))}>
                <Flex justify="center" my="xl">
                    <Title>Edit Address</Title>
                </Flex>
                <TextInput
                    label="Street"
                    name="street"
                    placeholder="Street name"
                    mt="md"
                    {...form.getInputProps("address.street")}
                />
                <SimpleGrid
                    columns={1}
                    breakpoints={[{minWidth: "sm", cols: 2, spacing: "md"}]}
                    spacing={"0"}
                >
                    <TextInput
                        label="Number"
                        name="number"
                        placeholder="House number"
                        mt="md"
                        {...form.getInputProps("address.number")}
                    />
                    <TextInput
                        label="Apartment number"
                        name="apartment_number"
                        placeholder="City/Town"
                        mt="md"
                        {...form.getInputProps("address.apartment_number")}
                    />
                </SimpleGrid>
                <TextInput
                    label="City"
                    name="city"
                    placeholder="City/Town"
                    mt="md"
                    {...form.getInputProps("address.city.name")}
                />
                <TextInput
                    label="Postal code"
                    name="postal_code"
                    placeholder="Postcode/Zip"
                    mt="md"
                    {...form.getInputProps("address.city.postal_code")}
                />
                <TextInput
                    label="County"
                    name="country"
                    placeholder="Country"
                    mt="md"
                    {...form.getInputProps("address.city.country.name")}
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

export default Address;
