import { TodoItemMeta } from "#types/todo.types.ts";
import { Input, Tag } from "#ui";
import { TodoTagList } from "@/components/Todo";
import { useTagParser } from "@/hooks/useTagParser.ts";
import { Icon } from "@iconify/react";
import { clsx } from "clsx";
import { ChangeEventHandler, FC, KeyboardEventHandler, useState } from "react";
import styles from "./TodoInput.module.scss";

interface TodoInputProps {
  onAdd: (text: string, meta: TodoItemMeta) => void;
  autoFocus?: boolean;
  className?: string;
}

const INITIAL_META: TodoItemMeta = Object.freeze({
  tags: [],
  notification: null,
});

export const TodoInput: FC<TodoInputProps> = ({
  onAdd,
  autoFocus,
  className,
}) => {
  const [todoText, setTodoText] = useState("");
  const [meta, setMeta] = useState<TodoItemMeta>(INITIAL_META);
  const { discoverTags, transfromTokenToTag, clearTags } = useTagParser();

  const sanitizeText = (value: string) => {
    const sanitizedText = clearTags(value);
    return sanitizedText;
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const tagTokens = discoverTags(event.target.value);
    const tags = tagTokens.map((token) => transfromTokenToTag(token));
    const uniqueTags = tags.filter(
      (item, idx, arr) => arr.findIndex((i) => i.name === item.name) === idx,
    );

    setMeta((meta) => ({
      ...meta,
      tags: uniqueTags,
    }));

    setTodoText(event.target.value);
  };

  const handleAdd = () => {
    const sanitizedText = sanitizeText(todoText).trim();
    if (sanitizedText) {
      onAdd(sanitizedText, meta);
    }

    setTodoText("");
    setMeta(INITIAL_META);
  };

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div>
      <Input
        onKeyDown={handleEnter}
        className={clsx(styles.input, className)}
        value={todoText}
        onChange={handleChange}
        autoFocus={autoFocus}
        postSlot={
          <button className={styles.addIcon}>
            <Icon onClick={handleAdd} icon="gravity-ui:plus" />
          </button>
        }
      />
      {meta.tags.length > 0 && (
        <TodoTagList className={styles.tags}>
          Добавленные теги:{" "}
          {meta.tags.map((tag) => (
            <Tag {...tag} key={tag.id} />
          ))}
        </TodoTagList>
      )}
    </div>
  );
};
