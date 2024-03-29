import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeeTime } from "../../server/types/TeeTime";
import { Course } from "../types/Course";

type CourseObject = {
  [key: string]: Course;
};

interface TeeTimesState {
  value: CourseObject;
}

const initialState: TeeTimesState = {
  value: {},
};

const sortTeeTimesByCourse = (teeTimes: Array<TeeTime>) => {
  return teeTimes.reduce((acc, teeTime) => {
    if (!acc[teeTime.courseId]) {
      acc[teeTime.courseId] = {
        courseId: teeTime.courseId,
        courseName: teeTime.courseName,
        teeTimes: [],
      };
    }
    acc[teeTime.courseId].teeTimes.push(teeTime);
    return acc;
  }, {} as CourseObject);
};

export const teeTimesSlice = createSlice({
  name: "teeTimes",
  initialState,
  reducers: {
    updateTeeTimes: (state, action: PayloadAction<Array<TeeTime>>) => {
      state.value = sortTeeTimesByCourse(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateTeeTimes } = teeTimesSlice.actions;

export default teeTimesSlice.reducer;
