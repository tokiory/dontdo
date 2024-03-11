import { clsx } from "clsx";
import { FC, PropsWithChildren } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  className?: string;
  onClick: () => void;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <button onClick={onClick} className={clsx(styles.button, className)}>
      {children}
    </button>
  );
};
