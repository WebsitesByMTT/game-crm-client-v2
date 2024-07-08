import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
