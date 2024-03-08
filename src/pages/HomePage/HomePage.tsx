import { Text } from "#ui";
import { KeyboardKey } from "#ui/KeyboardKey/KeyboardKey.tsx";
import {
  TodoFilter,
  TodoInput,
  TodoList,
  TodoListItem,
} from "@/components/Todo";
import { useTodoFilter } from "@/hooks/useTodoFilter.ts";
import { todoReducer } from "@/reducers/todoReducer.ts";
import { Icon } from "@iconify/react";
import { useReducer } from "react";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  const [todoList, dispatchTodoList] = useReducer(todoReducer, []);
  const { filters, filteredTodoList, handleFilterChange } =
    useTodoFilter(todoList);

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <TodoFilter {...filters} onChange={handleFilterChange} />
        <TodoInput
          className={styles.input}
          onAdd={(text) => dispatchTodoList({ type: "add", text })}
          autoFocus
        />
        {!todoList.length ? (
          <Text className={styles.welcomeText}>
            Просто напишите вашу первую задачу, а затем нажмите&nbsp;
            <KeyboardKey>Enter</KeyboardKey> или кликните по кнопке "
            <Icon icon="gravity-ui:plus" />"
          </Text>
        ) : (
          <TodoList className={styles.todoList}>
            {filteredTodoList.map((item) => (
              <TodoListItem
                {...item}
                onCheck={(id, state) =>
                  dispatchTodoList({ type: "check", id, isDone: state })
                }
                onEdit={(id, text) =>
                  dispatchTodoList({ type: "edit", id, text })
                }
                onDelete={(id) => dispatchTodoList({ type: "delete", id })}
                key={item.id}
              />
            ))}
          </TodoList>
        )}
      </div>
    </div>
  );
};
