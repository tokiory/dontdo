import { nanoid } from "nanoid";

export const createTodoId = () => {
  return `todo-${nanoid(10)}`;
};
