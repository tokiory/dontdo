import { TodoItem } from "#types/todo.types.ts";
import { TODO_LIST_KEY } from "@/data/localStorage.ts";
import { getStorageItem, setStorageItem } from "@/utils/storage.ts";

export const setStorageTodoList = (setStorageItem<TodoItem[]>).bind(
  null,
  TODO_LIST_KEY,
);

export const getStorageTodoList = (getStorageItem<TodoItem[]>).bind(
  null,
  TODO_LIST_KEY,
);
