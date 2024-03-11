import { clsx } from "clsx";
import { FC, PropsWithChildren } from "react";
import styles from "./TodoTagList.module.scss";

interface TodoTagListProps {
  className?: string;
}

export const TodoTagList: FC<PropsWithChildren<TodoTagListProps>> = ({
  children,
  className,
}) => {
  return <div className={clsx(styles.list, className)}>{children}</div>;
};
