import { RootState } from "@/app/store.ts";
import { TODO_LIST_KEY } from "@/data/localStorage.ts";
import { Middleware } from "@reduxjs/toolkit";

export const localStorageMiddleware: Middleware<
  unknown, // Most middleware do not modify the dispatch return value
  RootState
> = (store) => {
  return (next) => (action) => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(state.todo.list));
    return result;
  };
};
