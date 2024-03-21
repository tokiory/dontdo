import { TodoItemMeta } from "#types/todo.types.ts";
import { Text } from "#ui";
import { KeyboardKey } from "#ui/KeyboardKey/KeyboardKey.tsx";
import {
  TodoFilter,
  TodoInput,
  TodoList,
  TodoListItem,
  TodoSearch,
} from "@/components/Todo";
import { TODO_LIST_KEY } from "@/data/localStorage.ts";
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";
import { useAppSelector } from "@/hooks/useAppSelector.ts";
import {
  todoAdded,
  todoUpdated,
  todoDeleted,
  todoChecked,
} from "@/features/todo/todoSlice.ts";
import { useSearch } from "@/hooks/useSearch.ts";
import { useTodoFilter } from "@/hooks/useTodoFilter.ts";
import { Icon } from "@iconify/react";
import { useCallback, useEffect, useState } from "react";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  const [isSearching, setIsSearching] = useState(false);
  const { query, setQuery, handleSearchInput } = useSearch();

  const toggleSearch = useCallback(
    (state = !isSearching) => {
      setIsSearching(() => state);
      setQuery("");
    },
    [isSearching, setQuery],
  );

  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state) => state.todo.list);

  const { filters, filteredTodoList, handleFilterChange } =
    useTodoFilter(todoList);

  const handleAddTodoItem = (text: string, meta: TodoItemMeta) => {
    let itemTags = meta.tags;

    // Add current active tags to the new item
    if (filters.tags.length) {
      itemTags.push(...filters.tags);
      itemTags = itemTags.filter(
        (tag, index) =>
          index === itemTags.findIndex((item) => item.id === tag.id),
      );
    }

    dispatch(todoAdded({ text, meta: { ...meta, tags: itemTags } }));
  };

  const handleDeleteDone = () => {
    todoList
      .filter((item) => item.isDone)
      .forEach(({ id }) => {
        dispatch(todoDeleted(id));
      });
  };

  const searchedList = query.trim()
    ? filteredTodoList.filter(
        (item) =>
          item.text.toLowerCase().includes(query.trim()) ||
          item.meta.tags.some((tag) => tag.name.toLowerCase() === query.trim()),
      )
    : filteredTodoList;

  // Serialize data to localStorage
  useEffect(() => {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
  }, [todoList]);

  // Global keydown event listener
  useEffect(() => {
    const onGlobalKeydown = (event: globalThis.KeyboardEvent) => {
      if (
        event.code === "KeyF" &&
        event.shiftKey &&
        (event.ctrlKey || event.metaKey)
      ) {
        toggleSearch();
      }

      if (
        isSearching &&
        (event.key === "Escape" || (event.key === "Backspace" && query === ""))
      ) {
        toggleSearch();
      }
    };

    addEventListener("keydown", onGlobalKeydown);

    return () => {
      removeEventListener("keydown", onGlobalKeydown);
    };
  }, [toggleSearch, isSearching, query]);

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <TodoFilter
          {...filters}
          todoList={todoList}
          onDeleteDone={handleDeleteDone}
          className={styles.filters}
          onChange={handleFilterChange}
        />
        <div className={styles.input}>
          {isSearching ? (
            <>
              <TodoSearch
                autoFocus
                value={query}
                onChange={handleSearchInput}
              />
            </>
          ) : (
            <TodoInput onAdd={handleAddTodoItem} autoFocus />
          )}
        </div>
        {!todoList.length ? (
          <Text className={styles.welcomeText}>
            Просто напишите вашу первую задачу, а затем нажмите&nbsp;
            <KeyboardKey>Enter</KeyboardKey> или кликните по кнопке "
            <Icon icon="gravity-ui:plus" />"
          </Text>
        ) : (
          <TodoList className={styles.todoList}>
            {searchedList.map((item) => (
              <TodoListItem
                {...item}
                onCheck={(id, state) =>
                  dispatch(todoChecked({ id, isDone: state }))
                }
                onEdit={(item) => dispatch(todoUpdated(item))}
                onDelete={(id) => dispatch(todoDeleted(id))}
                key={item.id}
              />
            ))}
          </TodoList>
        )}
      </div>
    </div>
  );
};
