import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  courseIds: string[];
  hydrated: boolean;
}

const initialState: FavoritesState = { courseIds: [], hydrated: false };

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const idx = state.courseIds.indexOf(action.payload);
      if (idx === -1) state.courseIds.push(action.payload);
      else state.courseIds.splice(idx, 1);
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.courseIds = action.payload;
      state.hydrated = true;
    },
  },
});

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
