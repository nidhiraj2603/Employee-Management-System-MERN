import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./Slice/employeeSlice";
export const store = configureStore({
  reducer: {
    employeeReducer,
  },
});
