import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateState {
  value: number;
}

const initialState: DateState = {
  value: 30, // impossible values
};

export const distanceSlice = createSlice({
  name: "distance",
  initialState,
  reducers: {
    updateDistance: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateDistance } = distanceSlice.actions;

export default distanceSlice.reducer;
