import { TodoTag } from "#types/todo.types.ts";
import { useInputTagParser } from "@/hooks/useInputTagParser.ts";

export const useTodoInput = () => {
  const { discoverTags, transfromTokenToTag, clearTags } = useInputTagParser();

  const getSanitizedText = (value: string) => {
    let sanitizedText = clearTags(value);
    sanitizedText = sanitizedText.replaceAll(/\s+/g, " ");
    return sanitizedText;
  };

  const getParsedTags = (value: string): TodoTag[] => {
    const tagTokens = discoverTags(value);
    const tags = tagTokens.map((token) => transfromTokenToTag(token));
    return tags.filter(
      (item, idx, arr) => arr.findIndex((i) => i.name === item.name) === idx,
    );
  };

  return {
    getSanitizedText,
    getParsedTags,
  };
};
