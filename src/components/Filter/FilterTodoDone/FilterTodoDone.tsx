import { TodoFilters } from "#types/todo.types.ts";
import { Button, Text } from "#ui";
import { clsx } from "clsx";
import { FC } from "react";
import styles from "./FilterTodoDone.module.scss";

interface FilterTodoDoneProps {
  className?: string;
  onChange: (doneStatus: Pick<TodoFilters, "done">) => void;
  doneStatus: TodoFilters["done"];
}

export const FilterTodoDone: FC<FilterTodoDoneProps> = ({
  className,
  onChange,
  doneStatus: done,
}) => {
  const handleChangeStatus = () => {
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
    <Button className={className} onClick={handleChangeStatus}>
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
  );
};
