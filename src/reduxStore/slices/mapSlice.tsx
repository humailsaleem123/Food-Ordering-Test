import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoaded: false,
  currentLocation: null,
  restaurantRadius: "1500",
  marker: null,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    isMapLoaded(state, action) {
      state.isLoaded = action.payload;
    },
    setCurrentLocation(state, action) {
      state.currentLocation = action.payload;
    },

    setMapMarker(state, action) {
      state.marker = action.payload;
    },
  },
});

export const { isMapLoaded, setCurrentLocation, setMapMarker } =
  mapSlice.actions;
export const { reducer } = mapSlice;
