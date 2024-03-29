import { configureStore } from "@reduxjs/toolkit";
import teeTimesReducer from "./teeTimesSlice";
import filterReducer from "./filterSlice";
import dateReducer from "./dateSlice";

export const store = configureStore({
  reducer: {
    date: dateReducer,
    filter: filterReducer,
    teeTimes: teeTimesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
