import { localStorageMiddleware } from "./middlewares/localStorageMiddleware.ts";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducer from "@/features/todo/todoSlice";
import tagReducer from "@/features/tag/tagSlice";

// @see: https://redux.js.org/usage/usage-with-typescript#type-checking-middleware
const rootReducer = combineReducers({ todo: todoReducer, tag: tagReducer });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(localStorageMiddleware);
  },
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
