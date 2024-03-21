import {Tag} from "#types/tag.types.ts";

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

const parseTags = (value: string): Tag[] => {
  const tagTokens = discoverTags(value);
  return tagTokens.map((token) => createTag(token.name));
};

const createTag = (name: string): Tag => {
  return {
    name,
    id: `tag-${name}`,
  };
};

const transfromTokenToTag = (token: TagToken): Tag => {
  return createTag(token.name);
};

const clearTags = (value: string): string => {
  return value.replace(tagRegex, "");
};

export const useInputTagParser = () => {
  return { discoverTags, parseTags, clearTags, transfromTokenToTag };
};
