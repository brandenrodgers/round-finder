import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filter } from "../types/Filter";

interface FilterState {
  value: Filter;
}

const initialState: FilterState = {
  value: {},
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<Filter>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateFilter } = filterSlice.actions;

export default filterSlice.reducer;
