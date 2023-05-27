import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  userId: null,
  login: null,
  email: null,
  avatar: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {},
});

export const authReducer = authSlice.reducer;
