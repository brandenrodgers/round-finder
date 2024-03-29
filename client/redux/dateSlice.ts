import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dayjs } from "dayjs";

interface DateState {
  value: null | string;
}

const initialState: DateState = {
  value: null,
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    updateDate: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateDate } = dateSlice.actions;

export default dateSlice.reducer;
