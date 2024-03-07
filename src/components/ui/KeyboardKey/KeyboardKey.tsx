import { clsx } from "clsx";
import { FC, PropsWithChildren } from "react";
import styles from "./KeyboardKey.module.scss";

interface KeyboardKeyProps {
  className?: string;
}
export const KeyboardKey: FC<PropsWithChildren<KeyboardKeyProps>> = ({
  children,
  className,
}) => {
  return <div className={clsx(styles.key, className)}>{children}</div>;
};
