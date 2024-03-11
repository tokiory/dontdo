import { clsx } from "clsx";
import { FC, MouseEventHandler, PropsWithChildren } from "react";
import styles from "./Text.module.scss";

interface TextProps {
  className?: string;
  onClick?: MouseEventHandler;
  onDoubleClick?: MouseEventHandler;
}
export const Text: FC<PropsWithChildren<TextProps>> = ({
  children,
  className,
  onDoubleClick,
  onClick,
}) => {
  return (
    <div
      onDoubleClick={onDoubleClick}
      onClick={onClick}
      className={clsx(styles.text, className)}
    >
      {children}
    </div>
  );
};
