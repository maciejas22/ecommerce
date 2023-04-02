"use client";

import { useContext } from "react";

import {
  Container,
  Flex,
  TextInput,
  Title,
  SimpleGrid,
  Button,
  Space,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import AuthContext from "../../context/AuthProvider";

const Address = ({ user }) => {
  const { updateAddress } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      address: {
        street: user?.address?.street,
        number: user?.address?.number === null ? "" : user?.address?.number,
        apartment_number:
          user?.address?.apartment_number === null
            ? ""
            : user?.address?.apartment_number,
        city: {
          name: user?.address?.city?.name,
          postal_code: user?.address?.city?.postal_code,
          country: {
            name: user?.address?.city?.country?.name,
          },
        },
      },
    },
  });

  return (
    <Container>
      <form onSubmit={form.onSubmit((values) => updateAddress(form, values))}>
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
          breakpoints={[{ minWidth: "sm", cols: 2, spacing: "md" }]}
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
        <Space h="xl" />
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
