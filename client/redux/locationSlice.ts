import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateState {
  value: { lat: number; lon: number };
}

const initialState: DateState = {
  value: { lat: 91, lon: 91 }, // impossible values
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    updateLocation: (
      state,
      action: PayloadAction<{ lat: number; lon: number }>
    ) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateLocation } = locationSlice.actions;

export default locationSlice.reducer;
