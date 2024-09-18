import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  dropdownValue: "",
  locations: [],
};

const formSlice = createSlice({
  name: "CreateSlice",
  initialState,

  reducers: {
    setDropDownValue(state, action) {
      state.dropdownValue = action.payload;
    },
    setLocations(state, action) {
      state.locations = action.payload;
    },
    handleChangeDropDown(state, action) {
      state.dropdownValue = action.payload;
    },
  },
});

export const { setDropDownValue, setLocations, handleChangeDropDown } =
  formSlice.actions;
export const { reducer } = formSlice;
