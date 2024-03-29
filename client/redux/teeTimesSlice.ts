import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Courses } from "../../server/types/Course";

interface TeeTimesState {
  value: Courses;
}

const initialState: TeeTimesState = {
  value: {},
};

export const teeTimesSlice = createSlice({
  name: "teeTimes",
  initialState,
  reducers: {
    updateTeeTimes: (state, action: PayloadAction<Courses>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateTeeTimes } = teeTimesSlice.actions;

export default teeTimesSlice.reducer;
