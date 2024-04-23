import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UnitState {
  value: "mi" | "km";
}

const initialState: UnitState = {
  value: "mi",
};

export const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    updateUnits: (state, action: PayloadAction<"mi" | "km">) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUnits } = unitsSlice.actions;

export default unitsSlice.reducer;
