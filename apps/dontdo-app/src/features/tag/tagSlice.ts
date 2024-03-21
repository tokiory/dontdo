import {Tag} from "#types/tag.types.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

interface TagSliceState {
  list: Tag[];
}

const initialState: TagSliceState = {
  list: [],
};

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    tagRemoved(state, { payload: id }: PayloadAction<Tag["id"]>) {
      state.list = state.list.filter((tag) => tag.id !== id);
    },
    tagUpdated(state, action: PayloadAction<Tag>) {
      const tag = state.list.find((tag) => tag.id === action.payload.id);
      if (!tag) return;
      Object.assign(tag, action.payload);
    },
    tagAdded: {
      reducer: (state, action: PayloadAction<Tag>) => {
        state.list.push(action.payload);
      },
      prepare: (tag: Omit<Tag, "id">) => {
        return {
          payload: {
            ...tag,
            id: `tag-${nanoid()}`,
          } as Tag,
        };
      },
    },
  },
});

export const { tagRemoved, tagUpdated, tagAdded } = tagSlice.actions;

export default tagSlice.reducer;
