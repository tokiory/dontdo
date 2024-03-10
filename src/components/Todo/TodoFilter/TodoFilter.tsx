import { TodoFilters } from "#types/todo.types.ts";
import { FilterRow, FilterTodoDone, FilterTodoSort } from "@/components/Filter";
import { clsx } from "clsx";
import { FC } from "react";
import styles from "./TodoFilter.module.scss";

interface TodoFilterProps extends TodoFilters {
  onChange: (filters: Partial<TodoFilters>) => void;
  className?: string;
}

export const TodoFilter: FC<TodoFilterProps> = ({
  sort = "desc",
  done = "initial",
  onChange,
  className,
}) => {
  const handleFilterChange = (filters: Partial<TodoFilters>) => {
    onChange(filters);
  };

  const handleSort = () => {
    onChange({
      sort: sort === "desc" ? "asc" : "desc",
    });
  };

  return (
    <div className={clsx(styles.filter, className)}>
      <FilterRow>
        <FilterTodoSort
          className={styles.filterItem}
          onChange={handleSort}
          currentSortMode={sort}
        />
        <FilterTodoDone
          className={styles.filterItem}
          onChange={handleFilterChange}
          doneStatus={done}
        />
      </FilterRow>
    </div>
  );
};
