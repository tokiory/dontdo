/*
 * This hook is needed to process meta information for the Todo unit
 */
import { TodoItemMeta, TodoTag } from "#types/todo.types.ts";
import { useState } from "react";

const INITIAL_META: TodoItemMeta = Object.freeze({
  tags: [],
  notification: null,
});

export const useTodoMeta = () => {
  const [meta, setMeta] = useState<TodoItemMeta>(INITIAL_META);

  const clearMeta = () => {
    setMeta(INITIAL_META);
  };

  const getTextWithMeta = (value: string) => {
    const stringifiedTags = meta.tags.map((tag) => tag.name).join(" ");
    const result = value + " " + stringifiedTags;
    return result.replaceAll(/\s+/g, " ");
  };

  const updateTags = (tags: TodoTag[]) => {
    setMeta((meta) => ({
      ...meta,
      tags,
    }));
  };

  return {
    meta,
    setMeta,
    updateTags,
    getTextWithMeta,
    clearMeta,
  };
};
