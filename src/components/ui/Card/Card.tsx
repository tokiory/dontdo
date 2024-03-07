import { clsx } from "clsx";
import { FC, PropsWithChildren } from "react";
import styles from "./Card.module.scss";

interface CardProps {
  className?: string;
}
export const Card: FC<PropsWithChildren<CardProps>> = ({
  children,
  className,
}) => {
  return <div className={clsx(styles.card, className)}>{children}</div>;
};
