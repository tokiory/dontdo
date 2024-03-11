import { Input, InputBadge, Text } from "#ui";
import { Icon } from "@iconify/react";
import { ChangeEventHandler, FC } from "react";
import styles from "./TodoSearch.module.scss";

interface TodoSearchProps {
  value: string;
  onChange: ChangeEventHandler;
  autoFocus?: boolean;
}

export const TodoSearch: FC<TodoSearchProps> = ({
  value,
  onChange,
  autoFocus,
}) => {
  return (
    <Input
      autoFocus={autoFocus}
      preSlot={
        <InputBadge>
          <Text>Поиск</Text>
        </InputBadge>
      }
      postSlot={
        <button className={styles.searchButton}>
          <Icon icon="gravity-ui:magnifier" />
        </button>
      }
      value={value}
      onChange={onChange}
    />
  );
};
