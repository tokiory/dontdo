import { TodoFilters } from "#types/todo.types.ts";
import { Button, Text } from "#ui";
import { Icon } from "@iconify/react";
import { FC } from "react";

interface TodoSortFilterProps {
  onChange: (sortStatus: Pick<TodoFilters, "sort">) => void;
  className?: string;
  currentSortMode: TodoFilters["sort"];
}

export const FilterTodoSort: FC<TodoSortFilterProps> = ({
  onChange,
  className,
  currentSortMode: sort,
}) => {
  const sortButtonIcon =
    sort === "desc"
      ? "gravity-ui:bars-descending-align-left-arrow-down"
      : "gravity-ui:bars-descending-align-left-arrow-up";

  const handleSortChange = () => {
    onChange({
      sort: sort === "desc" ? "asc" : "desc",
    });
  };
  return (
    <Button onClick={handleSortChange} className={className}>
      <Text>Сортировка:&nbsp;</Text>
      <Icon icon={sortButtonIcon} />
    </Button>
  );
};
