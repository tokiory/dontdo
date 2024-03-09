import { TodoItemMeta } from "#types/todo.types.ts";
import { Input } from "#ui";
import { Icon } from "@iconify/react";
import { clsx } from "clsx";
import { ChangeEventHandler, FC, KeyboardEventHandler, useState } from "react";
import styles from "./TodoInput.module.scss";

interface TodoInputProps {
  onAdd: (text: string) => void;
  autoFocus?: boolean;
  className?: string;
}

export const TodoInput: FC<TodoInputProps> = ({
  onAdd,
  autoFocus,
  className,
}) => {
  const [todoText, setTodoText] = useState("");
  const [meta, setMeta] = useState<TodoItemMeta | null>(null);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTodoText(event.target.value);
  };

  const handleAdd = () => {
    if (!todoText.trim()) {
      setTodoText("");
      return;
    }
    onAdd(todoText);
    setTodoText("");
  };

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  return (
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
  );
};
