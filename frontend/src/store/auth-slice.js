import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      isAuth: !!localStorage.getItem('token') || false,
      token: localStorage.getItem('token') || null,
      userName: localStorage.getItem('user-name') || null,
   },
   reducers: {
      loginUser(state, {payload}) {
         state.isAuth = true;
         state.token = payload.token;
         state.userName = payload.userName;
         localStorage.setItem('token', payload.token);
         localStorage.setItem('user-name', payload.userName);
      },
      logoutUser(state) {
         state.isAuth = false;
         state.token = null;
         state.userName = null;
         localStorage.removeItem('token');
         localStorage.removeItem('user-name');
      }
   }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;