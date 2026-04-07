import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SORT_VALUES } from "@/lib/constants";
import { SortBy } from "@/lib/types";

interface SortState {
  value: SortBy;
}

const initialState: SortState = {
  value: SORT_VALUES.forMe,
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

export const { updateSort } = sortSlice.actions;

export default sortSlice.reducer;
