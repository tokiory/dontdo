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
        <Icon
          onClick={handleAdd}
          className={styles.addIcon}
          fontSize={22}
          icon="gravity-ui:plus"
        />
      }
    />
  );
};
