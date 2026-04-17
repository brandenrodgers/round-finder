"use client";

import { useLayoutEffect } from "react";
import { Provider } from "react-redux";
import { store, FAVORITES_STORAGE_KEY } from "@/store";
import { setFavorites } from "@/store/favoritesSlice";

function FavoritesHydrator() {
  useLayoutEffect(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      const safe = Array.isArray(parsed)
        ? parsed.filter((v): v is string => typeof v === "string")
        : [];
      store.dispatch(setFavorites(safe));
    } catch {
      store.dispatch(setFavorites([]));
    }
  }, []);

  return null;
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <FavoritesHydrator />
      {children}
    </Provider>
  );
}
