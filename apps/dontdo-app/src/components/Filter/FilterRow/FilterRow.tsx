import { clsx } from "clsx";
import { FC, PropsWithChildren } from "react";
import styles from "./FilterRow.module.scss";

export const FilterRow: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return <div className={clsx(styles.row, className)}>{children}</div>;
};
