export interface TodoItem {
  id: string;
  text: string;
  isDone: boolean;
}

export interface TodoFilters {
  sort: "asc" | "desc";
  done: "onlyDone" | "notDone" | "initial";
}
