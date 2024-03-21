import type { TodoItem } from "#types/todo.types.ts";
import { getStorageTodoList } from "@/storage/todo.ts";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TodoSliceState {
  list: TodoItem[];
}

const initialState: TodoSliceState = Object.freeze({
  list: getStorageTodoList() || [],
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    todoChecked: (
      state,
      action: PayloadAction<Pick<TodoItem, "id" | "isDone">>,
    ) => {
      const todo = state.list.find((todo) => todo.id === action.payload.id);
      if (!todo) return;
      todo.isDone = action.payload.isDone;
    },
    todoAdded: {
      reducer(state, action: PayloadAction<TodoItem>) {
        state.list.push(action.payload);
      },
      prepare: (todo: Omit<TodoItem, "id" | "isDone">) => {
        return {
          payload: {
            ...todo,
            id: Date.now().toString(),
            isDone: false,
          } as TodoItem,
        };
      },
    },
    todoUpdated: (state, action: PayloadAction<TodoItem>) => {
      const todo = state.list.find((todo) => todo.id === action.payload.id);
      if (!todo) return;
      Object.assign(todo, action.payload);
    },
    todoDeleted: (state, { payload: id }: PayloadAction<TodoItem["id"]>) => {
      state.list = state.list.filter((todo) => todo.id !== id);
    },
  },
});

export const { todoAdded, todoChecked, todoUpdated, todoDeleted } =
  todoSlice.actions;
export default todoSlice.reducer;
