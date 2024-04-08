import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";

export default configureStore({
   reducer : {
      auth: authSlice
   }
})