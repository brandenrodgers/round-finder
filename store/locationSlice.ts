import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Coordinates } from "@/lib/types";

export const requestLocation = createAsyncThunk(
  "location/request",
  () =>
    new Promise<Coordinates>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => reject(err),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    })
);

interface LocationState {
  coords: Coordinates | null;
  status: "idle" | "loading" | "granted" | "denied";
}

const initialState: LocationState = { coords: null, status: "idle" };

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestLocation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(requestLocation.fulfilled, (state, action) => {
        state.coords = action.payload;
        state.status = "granted";
      })
      .addCase(requestLocation.rejected, (state) => {
        state.status = "denied";
      });
  },
});

export default locationSlice.reducer;
