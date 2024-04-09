import { createSlice } from "@reduxjs/toolkit";

let token = null;

const expirationTime = +localStorage.getItem('expiration-time');

if(expirationTime) {
   if(Date.now() < expirationTime) {
      token = localStorage.getItem('token');
   }
}

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      isAuth: !!token || false,
      token: token,
      userName: localStorage.getItem('user-name') || null,
   },
   reducers: {
      loginUser(state, {payload}) {
         state.isAuth = true;
         state.token = payload.token;
         state.userName = payload.userName;
         localStorage.setItem('token', payload.token);
         localStorage.setItem('user-name', payload.userName);
         localStorage.setItem('expiration-time', payload.expirationTime);
      },
      logoutUser(state) {
         state.isAuth = false;
         state.token = null;
         state.userName = null;
         localStorage.removeItem('token');
         localStorage.removeItem('user-name');
         localStorage.removeItem('expiration-time');
      }
   }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;