import { TodoItemMeta } from "#types/todo.types.ts";
import { Input, Tag } from "#ui";
import { TodoTagList } from "@/components/Todo";
import { useTodoInput } from "@/hooks/useTodoInput.ts";
import { useTodoMeta } from "@/hooks/useTodoMeta.ts";
import { Icon } from "@iconify/react";
import { clsx } from "clsx";
import { ChangeEventHandler, FC, KeyboardEventHandler, useState } from "react";
import styles from "./TodoInput.module.scss";

interface TodoInputProps {
  onAdd: (text: string, meta: TodoItemMeta) => void;
  autoFocus?: boolean;
  className?: string;
}

export const TodoInput: FC<TodoInputProps> = ({
  onAdd,
  autoFocus,
  className,
}) => {
  const [todoText, setTodoText] = useState("");
  const { meta, clearMeta, updateTags } = useTodoMeta();
  const { getSanitizedText, getParsedTags } = useTodoInput();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    updateTags(getParsedTags(event.target.value));
    setTodoText(event.target.value);
  };

  const handleAdd = () => {
    const sanitizedText = getSanitizedText(todoText).trim();
    if (sanitizedText) {
      onAdd(sanitizedText, meta);
    }

    setTodoText("");
    clearMeta();
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
