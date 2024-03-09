/*
 * This hook is needed to process meta information for the Todo unit
 */
import { TodoItemMeta } from "#types/todo.types.ts";
import { useTagParser } from "@/hooks/useTagParser.ts";
import { useState } from "react";

const INITIAL_META: TodoItemMeta = Object.freeze({
  tags: [],
  notification: null,
});

export const useTodoItemMeta = () => {
  const [meta, setMeta] = useState<TodoItemMeta>(INITIAL_META);
  const { discoverTags, transfromTokenToTag, clearTags } = useTagParser();

  const clearMeta = () => {
    setMeta(INITIAL_META);
  };

  const getSanitizedText = (value: string) => {
    const sanitizedText = clearTags(value);
    return sanitizedText;
  };

  const getTextWithMeta = (value: string) => {
    const stringifiedTags = meta.tags.map((tag) => tag.name).join(" ");
    return value + " " + stringifiedTags;
  };

  const handleTagParsing = (inputValue: string) => {
    const tagTokens = discoverTags(inputValue);
    const tags = tagTokens.map((token) => transfromTokenToTag(token));
    const uniqueTags = tags.filter(
      (item, idx, arr) => arr.findIndex((i) => i.name === item.name) === idx,
    );

    setMeta((meta) => ({
      ...meta,
      tags: uniqueTags,
    }));
  };

  return {
    meta,
    getTextWithMeta,
    getSanitizedText,
    clearMeta,
    handleTagParsing,
  };
};
