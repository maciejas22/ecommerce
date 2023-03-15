import { TextInput, ActionIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";

const SearchBar = ({ widthPercentage, padding }) => {
  const form = useForm({
    initialValues: {
      searchQuery: "",
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => console.log(values.searchQuery))}
      style={{ width: widthPercentage, padding: padding }}
    >
      <TextInput
        radius="xl"
        size="md"
        rightSection={
          <ActionIcon
            type="submit"
            size={32}
            radius="xl"
            color="blue"
            variant="filled"
          >
            <IconSearch size={18} stroke={1.5} />
          </ActionIcon>
        }
        placeholder="Search for a product"
        rightSectionWidth={42}
        {...form.getInputProps("searchQuery")}
      />
    </form>
  );
};

export default SearchBar;
