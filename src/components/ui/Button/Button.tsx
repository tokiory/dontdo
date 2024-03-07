import { FC, PropsWithChildren } from "react";
import styles from "./Button.module.scss";

export const Button: FC<PropsWithChildren> = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};
