import { ChangeEventHandler, useState } from "react";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const handleSearchInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.target.value.toLowerCase().trim());
  };

  return {
    query,
    setQuery,
    handleSearchInput,
  };
};
