import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filter } from "@/lib/types";

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

export const { updateFilter } = filterSlice.actions;

export default filterSlice.reducer;
