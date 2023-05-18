import {Button, Container, Flex, SimpleGrid, Space, TextInput, Title,} from "@mantine/core";
import {useForm} from "@mantine/form";
import {notifications} from "@mantine/notifications";
import useAxios from "@/utils/useAxios";

const Address = ({address, setAddress, nextStep, prevStep}) => {
    const api = useAxios();
    
    const form = useForm({
        initialValues: {
            address: {
                street: address?.street || '',
                number: address?.number || '',
                apartment_number: address?.apartment_number || '',
                city: {
                    name: address?.city?.name || '',
                    postal_code: address?.city?.postal_code || '',
                    country: {
                        name: address?.city?.country?.name || '',
                    },
                },
            },
        },
        
        validate: {
            address: {
                street: (value) => (value.length < 2 ? 'Must have at least 2 characters' : null),
                number: (value) => (value === '' ? 'This field is required' : null),
                city: {
                    name: (value) => (value.length < 2 ? 'Must have at least 2 characters' : null),
                    postal_code: (value) => (value.length < 2 ? 'Must have at least 2 characters' : null),
                    country: {
                        name: (value) => (value.length < 2 ? 'Must have at least 2 characters' : null),
                    }
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
            .put("order/get-cart/", JSON.stringify(body), {})
            .then((response) => {
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
            <form onSubmit={form.onSubmit((values) => {
                setAddress(values.address)
                updateAddress(form, values).then(nextStep())
            })}>
                <Flex justify="center" my="xl">
                    <Title>Edit Adress</Title>
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
                <SimpleGrid cols={2}>
                    <Button variant="default" type="button" onClick={prevStep}>Previous Step</Button>
                    <Button type='submit'>Next Step</Button>
                </SimpleGrid>
            </form>
        </Container>
    );
};

export default Address;
