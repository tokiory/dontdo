import { Card, Checkbox, Tag, Text } from "#ui";
import { TodoItem, TodoItemMeta } from "#types/todo.types";
import { TodoTagList } from "@/components/Todo";
import { Icon } from "@iconify/react";
import { clsx } from "clsx";
import { ChangeEventHandler, FC, KeyboardEventHandler, useState } from "react";
import styles from "./TodoListItem.module.scss";

interface TodoListItemProps extends TodoItem {
  onDelete: (id: TodoItem["id"]) => void;
  onCheck: (id: TodoItem["id"], state: boolean) => void;
  onEdit: (id: TodoItem["id"], text: string, meta: TodoItemMeta) => void;
}

export const TodoListItem: FC<TodoListItemProps> = ({
  text,
  onCheck,
  onDelete,
  onEdit,
  isDone,
  id,
  meta,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleCheck: ChangeEventHandler<HTMLInputElement> = (event) => {
    onCheck(id, event.target.checked);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleCardDoubleClick = () => {
    setIsEditing(true);
  };

  const handleEditKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Escape") {
      const input = event.target as HTMLInputElement;
      input.blur();
      setIsEditing(false);
    }

    if (event.key === "Enter") {
      const input = event.target as HTMLInputElement;
      input.blur();
      setIsEditing(false);
      onEdit(id, input.value, meta);
    }
  };

  return (
    <Card
      onDoubleClick={handleCardDoubleClick}
      className={clsx(styles.item, isEditing && styles.active)}
    >
      <div className={styles.main}>
        <div className={styles.information}>
          <Checkbox checked={isDone} onChange={handleCheck} />
          {isEditing ? (
            <input
              className={styles.editor}
              autoFocus
              onKeyDown={handleEditKeydown}
              onBlur={() => setIsEditing(false)}
              defaultValue={text}
            />
          ) : (
            <Text className={styles.text}>{text}</Text>
          )}
        </div>
        <div className={styles.control}>
          <button onClick={handleDelete} className={styles.controlItem}>
            <Icon fontSize={16} icon="gravity-ui:xmark" />
          </button>
        </div>
      </div>
      <TodoTagList className={styles.tagList}>
        {meta.tags.map((tag) => (
          <Tag {...tag} key={tag.id} />
        ))}
      </TodoTagList>
    </Card>
  );
};
