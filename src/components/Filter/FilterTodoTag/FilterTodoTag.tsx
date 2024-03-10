import { TodoFilters, TodoTag } from "#types/todo.types.ts";
import { Tag } from "#ui";
import { TodoTagList } from "@/components/Todo";
import { clsx } from "clsx";
import { FC } from "react";
import styles from "./FilterTodoTag.module.scss";

interface FilterTodoTag {
  className?: string;
  tags: TodoTag[];
  activeTags: TodoFilters["tags"];
  onTagToggle: (tags: Pick<TodoFilters, "tags">) => void;
}

export const FilterTodoTag: FC<FilterTodoTag> = ({
  className,
  onTagToggle,
  tags,
  activeTags,
}) => {
  const onTagSelect = (tag: TodoTag) => {
    if (activeTags.some((activeTag) => activeTag.id === tag.id)) {
      onTagToggle({
        tags: activeTags.filter((activeTag) => activeTag.id !== tag.id),
      });
    } else {
      onTagToggle({ tags: [...activeTags, tag] });
    }
  };

  const activeTagsIndices = activeTags.map((tag) => tag.id);

  return (
    <TodoTagList className={clsx(styles.tags, className)}>
      {tags.map((tag) => (
        <Tag
          onClick={onTagSelect}
          className={clsx(
            activeTagsIndices.includes(tag.id) && styles.activeTag,
          )}
          key={tag.id}
          {...tag}
        />
      ))}
    </TodoTagList>
  );
};
