import { clsx } from "clsx";
import { FC, PropsWithChildren } from "react";
import styles from "./InputBadge.module.scss";

interface InputBadgeProps {
  className?: string;
}

export const InputBadge: FC<PropsWithChildren<InputBadgeProps>> = ({
  children,
  className,
}) => {
  return <div className={clsx(styles.badge, className)}>{children}</div>;
};
