import { clsx } from "clsx";
import { FC, PropsWithChildren } from "react";
import styles from "./Text.module.scss";

interface TextProps {
  className?: string;
}
export const Text: FC<PropsWithChildren<TextProps>> = ({
  children,
  className,
}) => {
  return <div className={clsx(styles.text, className)}>{children}</div>;
};
