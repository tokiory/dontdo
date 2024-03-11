import { clsx } from "clsx";
import { FC, PropsWithChildren } from "react";
import styles from "./TodoList.module.scss";

interface TodoListProps {
  className?: string;
}

export const TodoList: FC<PropsWithChildren<TodoListProps>> = ({
  className,
  children,
}) => {
  return <div className={clsx(styles.list, className)}>{children}</div>;
};
