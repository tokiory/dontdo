import { TodoTag } from "#types/todo.types.ts";

interface TagToken {
  cursorRange: [number, number];
  name: string;
}

const tagRegex = /(?<![\w\\])#\w+/g;

const discoverTags = (value: string): TagToken[] => {
  const matches = [...value.matchAll(tagRegex)];

  return matches.map((match) => {
    return {
      name: match[0],
      cursorRange: [match.index ?? 0, +(match.index ?? 0) + match[0].length],
    };
  });
};

const parseTags = (value: string): TodoTag[] => {
  const tagTokens = discoverTags(value);
  return tagTokens.map((token) => createTag(token.name));
};

const createTag = (name: string): TodoTag => {
  return {
    name,
    id: `tag-${name}`,
  };
};

const transfromTokenToTag = (token: TagToken): TodoTag => {
  return createTag(token.name);
};

const clearTags = (value: string): string => {
  return value.replace(tagRegex, "");
};

export const useTagParser = () => {
  return { discoverTags, parseTags, clearTags, transfromTokenToTag };
};
