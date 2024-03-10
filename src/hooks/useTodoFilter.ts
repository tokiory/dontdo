import { TodoFilters, TodoItem } from "#types/todo.types.ts";
import { useEffect, useState } from "react";

const getFilteredTodoList = (todoList: TodoItem[], filters: TodoFilters) => {
  let filteredTodoList: TodoItem[];

  if (filters.sort === "asc") {
    filteredTodoList = [...todoList].reverse();
  } else {
    filteredTodoList = todoList;
  }

  if (filters.done === "notDone") {
    filteredTodoList = filteredTodoList.filter((item) => !item.isDone);
  } else if (filters.done === "onlyDone") {
    filteredTodoList = filteredTodoList.filter((item) => item.isDone);
  }

  if (filters.tags.length > 0) {
    for (const tag of filters.tags) {
      filteredTodoList = filteredTodoList.filter((item) =>
        item.meta.tags.some((itemTag) => itemTag.id === tag.id),
      );
    }
  }

  return filteredTodoList;
};

const INITIAL_FILTER_STATE: TodoFilters = {
  sort: "desc",
  done: "initial",
  tags: [],
};

const FILTER_SESSION_STORAGE_KEY = "todo-filters";

export const useTodoFilter = (todoList: TodoItem[]) => {
  const [filters, setFilters] = useState<TodoFilters>(() => {
    const previousFilters = sessionStorage.getItem(FILTER_SESSION_STORAGE_KEY);
    return previousFilters ? JSON.parse(previousFilters) : INITIAL_FILTER_STATE;
  });

  const handleFilterChange = (changedFilters: Partial<TodoFilters>) => {
    setFilters({
      ...filters,
      ...changedFilters,
    });
  };

  useEffect(() => {
    sessionStorage.setItem(FILTER_SESSION_STORAGE_KEY, JSON.stringify(filters));
  }, [filters]);

  return {
    filters,
    handleFilterChange,
    filteredTodoList: getFilteredTodoList(todoList, filters),
  };
};
