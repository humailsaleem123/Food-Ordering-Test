import { combineReducers } from "@reduxjs/toolkit";
import { reducer as CreateSlice } from "./slices/createSlice";
import { reducer as MapReducer } from "./slices/mapSlice";

export const rootReducer = combineReducers({
  CreateSlice: CreateSlice,
  Map: MapReducer,
});
