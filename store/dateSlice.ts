import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const { updateDate } = dateSlice.actions;

export default dateSlice.reducer;
