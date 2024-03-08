import { TodoFilters, TodoItem } from "#types/todo.types.ts";
import { useState } from "react";

export const useTodoFilter = (todoList: TodoItem[]) => {
  const [filters, setFilters] = useState<TodoFilters>({
    sort: "desc",
    done: "initial",
  });

  const handleFilterChange = (changedFilters: Partial<TodoFilters>) => {
    setFilters({
      ...filters,
      ...changedFilters,
    });
  };

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

  return {
    filters,
    handleFilterChange,
    filteredTodoList,
  };
};
