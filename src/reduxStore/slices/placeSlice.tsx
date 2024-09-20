import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurants: [],
};

const placesSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    setRestaurants(state, action) {
      state.restaurants = action.payload;
    },
  },
});

export const { setRestaurants } = placesSlice.actions;
export const { reducer } = placesSlice;
