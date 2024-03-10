export interface TodoItem {
  id: string;
  text: string;
  isDone: boolean;
  meta: TodoItemMeta;
}

export interface TodoTag {
  id: string;
  name: string;
}

export interface TodoItemMeta {
  notification: Date | null;
  tags: TodoTag[];
}

export interface TodoFilters {
  sort: "asc" | "desc";
  done: "onlyDone" | "notDone" | "initial";
  tags: TodoTag[];
}
