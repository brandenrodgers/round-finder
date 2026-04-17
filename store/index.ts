import { configureStore, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import courseReducer from "./courseSlice";
import filterReducer from "./filterSlice";
import dateReducer from "./dateSlice";
import sortReducer from "./sortSlice";
import locationReducer from "./locationSlice";
import favoritesReducer, { toggleFavorite, setFavorites } from "./favoritesSlice";

export const FAVORITES_STORAGE_KEY = "round-finder:favorites";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(toggleFavorite, setFavorites),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.favorites.courseIds));
    } catch {
      // localStorage unavailable (SSR, private browsing quota)
    }
  },
});

export const store = configureStore({
  reducer: {
    date: dateReducer,
    filter: filterReducer,
    courses: courseReducer,
    sort: sortReducer,
    location: locationReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
