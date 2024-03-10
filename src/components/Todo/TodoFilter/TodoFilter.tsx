import { TodoFilters, TodoTag } from "#types/todo.types.ts";
import {
  FilterRow,
  FilterTodoDone,
  FilterTodoSort,
  FilterTodoTag,
} from "@/components/Filter";
import { clsx } from "clsx";
import { FC } from "react";
import styles from "./TodoFilter.module.scss";

interface TodoFilterProps extends TodoFilters {
  onChange: (filters: Partial<TodoFilters>) => void;
  className?: string;
  tagList: TodoTag[];
}

export const TodoFilter: FC<TodoFilterProps> = ({
  sort = "desc",
  done = "initial",
  tags,
  tagList,
  onChange,
  className,
}) => {
  const handleFilterChange = (filters: Partial<TodoFilters>) => {
    onChange(filters);
  };

  return (
    <div className={clsx(styles.filter, className)}>
      <FilterTodoTag
        tags={tagList}
        activeTags={tags}
        onTagToggle={handleFilterChange}
      />
      <FilterRow>
        <FilterTodoSort
          className={styles.filterItem}
          onChange={handleFilterChange}
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
