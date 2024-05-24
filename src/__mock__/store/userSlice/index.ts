import { createSlice } from "@reduxjs/toolkit";
import { user } from "./types";

export const userSlice = createSlice({
  name: "userState",
  initialState: {
    user: {
      email: "",
      pass: "",
    },
    isProtected: true,
    isLogin: false,
  } as user,
  reducers: {
    setUser(state, payload) {
      state.user = payload.payload;
    },
    setIsProtected(state, payload) {
      state.isProtected = payload.payload;
    },
    setIsLogin(state, payload) {
      state.isLogin = payload.payload;
    },
  },
});

export const { setUser, setIsLogin, setIsProtected } = userSlice.actions;

export default userSlice.reducer;
