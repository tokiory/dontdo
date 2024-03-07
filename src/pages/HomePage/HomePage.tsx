import { Text } from "#ui";
import { KeyboardKey } from "#ui/KeyboardKey/KeyboardKey.tsx";
import { TodoInput } from "@/components/Todo";
import { Icon } from "@iconify/react";
import { useState } from "react";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  // TODO: Move this list into redux
  const [todoList, setTodoList] = useState<string[]>([]);

  const handleAdd = (text: string) => {
    setTodoList([...todoList, text]);
  };

  console.log({ todoList });

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <TodoInput onAdd={handleAdd} autoFocus />
        {!todoList.length && (
          <Text className={styles.welcomeText}>
            Просто напишите вашу первую задачу, а затем нажмите&nbsp;
            <KeyboardKey>Enter</KeyboardKey> или кликните по кнопке "
            <Icon icon="gravity-ui:plus" />"
          </Text>
        )}
      </div>
    </div>
  );
};
