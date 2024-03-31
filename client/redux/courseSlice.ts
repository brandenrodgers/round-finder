import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Courses } from "../../server/types/Course";

interface CoursesState {
  value: Courses;
}

const initialState: CoursesState = {
  value: {},
};

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    updateCourses: (state, action: PayloadAction<Courses>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCourses } = courseSlice.actions;

export default courseSlice.reducer;
