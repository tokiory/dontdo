import { TodoFilters, TodoItem } from "#types/todo.types.ts";
import { Button, Text } from "#ui";
import {
  FilterRow,
  FilterTodoDone,
  FilterTodoSort,
  FilterTodoTag,
} from "@/components/Filter";
import { Icon } from "@iconify/react";
import { clsx } from "clsx";
import { FC } from "react";
import styles from "./TodoFilter.module.scss";

interface TodoFilterProps extends TodoFilters {
  onChange: (filters: Partial<TodoFilters>) => void;
  onDeleteDone: () => void;
  className?: string;
  todoList: TodoItem[];
}

export const TodoFilter: FC<TodoFilterProps> = ({
  sort = "desc",
  done = "initial",
  tags,
  todoList,
  onChange,
  onDeleteDone,
  className,
}) => {
  const handleFilterChange = (filters: Partial<TodoFilters>) => {
    onChange(filters);
  };

  const tagList = todoList
    .map((item) => item.meta.tags)
    .flat()
    .filter((item, idx, arr) => {
      return arr.findIndex((tag) => tag.id === item.id) === idx;
    });

  const doneTodoItems = todoList.filter((item) => item.isDone);

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
        {doneTodoItems.length >= 10 && (
          <Button
            className={clsx(styles.filterItem, styles.deleteButton)}
            onClick={onDeleteDone}
          >
            <Icon icon="gravity-ui:trash-bin" />
            <Text>Удалить сделанные</Text>
          </Button>
        )}
      </FilterRow>
    </div>
  );
};
