import {Button, Container, Flex, SimpleGrid, Space, TextInput, Title,} from "@mantine/core";
import {useForm} from "@mantine/form";

const Address = ({address, setAddress, nextStep, prevStep}) => {
    const form = useForm({
        initialValues: {
            address: {
                street: address?.street,
                number: address?.number === null ? "" : address?.number,
                apartment_number:
                    address?.apartment_number === null
                        ? ""
                        : address?.apartment_number,
                city: {
                    name: address?.city?.name,
                    postal_code: address?.city?.postal_code,
                    country: {
                        name: address?.city?.country?.name,
                    },
                },
            },
        },
    });

    return (
        <Container>
            <form onSubmit={form.onSubmit((values) => {
                setAddress(values.address)
                nextStep()
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
