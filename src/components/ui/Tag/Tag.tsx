import { TodoTag } from "#types/todo.types.ts";
import { clsx } from "clsx";
import { FC } from "react";
import styles from "./Tag.module.scss";
import { Text } from "#ui";

interface TagProps extends TodoTag {
  className?: string;
}
export const Tag: FC<TagProps> = ({ className, name }) => {
  return (
    <div className={clsx(styles.tag, className)}>
      <Text className={styles.text}>{name}</Text>
    </div>
  );
};
