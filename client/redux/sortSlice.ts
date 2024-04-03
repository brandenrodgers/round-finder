import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SORT_VALUES } from "../constants";
import { SortBy } from "../types/Sort";

interface SortState {
  value: SortBy;
}

const initialState: SortState = {
  value: SORT_VALUES.alphabetical,
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    updateSort: (state, action: PayloadAction<SortBy>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSort } = sortSlice.actions;

export default sortSlice.reducer;
