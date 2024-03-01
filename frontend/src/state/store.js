import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import doctorReducer from "./doctorSlice";
import orderReducer from "./orderSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    order: orderReducer,
  },
});
