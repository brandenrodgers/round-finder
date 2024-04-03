import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./courseSlice";
import filterReducer from "./filterSlice";
import dateReducer from "./dateSlice";
import sortReducer from "./sortSlice";

export const store = configureStore({
  reducer: {
    date: dateReducer,
    filter: filterReducer,
    courses: courseReducer,
    sort: sortReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
