import { clsx } from "clsx";
import { FC, HTMLProps, PropsWithChildren } from "react";
import styles from "./Card.module.scss";

export const Card: FC<PropsWithChildren<HTMLProps<HTMLDivElement>>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div {...props} className={clsx(styles.card, className)}>
      {children}
    </div>
  );
};
