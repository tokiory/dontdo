import { Tag } from "#types/tag.types.ts";

export interface TodoItem {
  id: string;
  text: string;
  isDone: boolean;
  meta: TodoItemMeta;
}

export interface TodoItemMeta {
  notification: Date | null;
  tags: Pick<Tag, "id">[];
}

export interface TodoFilters {
  sort: "asc" | "desc";
  done: "onlyDone" | "notDone" | "initial";
  tags: Tag[];
}
