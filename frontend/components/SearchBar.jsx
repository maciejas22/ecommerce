import { useRouter } from "next/navigation";

import { TextInput, ActionIcon } from "@mantine/core";
import { useForm } from "@mantine/form";

import { IconSearch } from "@tabler/icons-react";

const SearchBar = ({ widthPercentage, padding }) => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      searchQuery: "",
    },
  });

  const onSearch = (e) => {
    e.preventDefault();

    if (typeof form.values.searchQuery !== "string") {
      return;
    }

    const encodedSearchQuery = encodeURIComponent(form.values.searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
  };

  return (
    <form
      onSubmit={onSearch}
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
