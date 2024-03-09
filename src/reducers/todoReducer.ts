import { TodoItem, TodoItemMeta } from "#types/todo.types.ts";
import { createTodoId } from "@/utils/todo.ts";

interface TodoActionDelete {
  type: "delete";
  id: TodoItem["id"];
}

interface TodoActionAdd {
  type: "add";
  text: TodoItem["text"];
  meta: TodoItemMeta;
}

interface TodoActionEdit {
  type: "edit";
  id: TodoItem["id"];
  text: TodoItem["text"];
  meta: TodoItemMeta;
}

interface TodoActionCheck {
  type: "check";
  id: TodoItem["id"];
  isDone: TodoItem["isDone"];
}

type TodoAction =
  | TodoActionDelete
  | TodoActionAdd
  | TodoActionCheck
  | TodoActionEdit;

type TodoState = TodoItem[];
export const todoReducer = (state: TodoState, action: TodoAction) => {
  switch (action.type) {
    case "delete": {
      const { id } = action;
      return state.filter((todo) => todo.id !== id);
    }
    case "edit": {
      const { id, text, meta } = action;
      return state.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            text,
            meta,
          };
        }
        return todo;
      });
    }
    case "check": {
      const { id, isDone } = action;
      return state.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone,
          };
        }
        return todo;
      });
    }
    case "add": {
      const { text, meta } = action;
      return [
        ...state,
        {
          id: createTodoId(),
          text,
          meta,
          isDone: false,
        },
      ];
    }
  }
};
