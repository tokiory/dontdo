import { TodoFilters } from "#types/todo.types.ts";
import { Button, Text } from "#ui";
import { Icon } from "@iconify/react";
import { clsx } from "clsx";
import { FC } from "react";
import styles from "./TodoFilter.module.scss";

interface TodoFilterProps extends TodoFilters {
  onChange: (filters: Partial<TodoFilters>) => void;
}

export const TodoFilter: FC<TodoFilterProps> = ({
  sort = "desc",
  done = false,
  onChange,
}) => {
  const sortButtonIcon =
    sort === "desc"
      ? "gravity-ui:bars-descending-align-left-arrow-down"
      : "gravity-ui:bars-descending-align-left-arrow-up";

  const handleSort = () => {
    onChange({
      sort: sort === "desc" ? "asc" : "desc",
    });
  };

  const handleDone = () => {
    let newDone: TodoFilters["done"];

    switch (done) {
      case "initial":
        newDone = "notDone";
        break;
      case "notDone":
        newDone = "onlyDone";
        break;
      default:
        newDone = "initial";
    }

    onChange({
      done: newDone,
    });
  };

  return (
    <div className={styles.filter}>
      {/* Sort */}
      <Button onClick={handleSort} className={styles.filterItem}>
        <Text>Сортировка:&nbsp;</Text>
        <Icon icon={sortButtonIcon} />
      </Button>

      {/* Done */}
      <Button className={styles.filterItem} onClick={handleDone}>
        <Text
          className={clsx(
            styles.doneText,
            done === "onlyDone" && styles.done,
            done === "notDone" && styles.notDone,
          )}
        >
          Сделанные
        </Text>
      </Button>
    </div>
  );
};
