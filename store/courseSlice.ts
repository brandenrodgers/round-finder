import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Courses } from "@/lib/types";

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

export const { updateCourses } = courseSlice.actions;

export default courseSlice.reducer;
