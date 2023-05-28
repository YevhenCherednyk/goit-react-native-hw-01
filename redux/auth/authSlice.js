import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  login: null,
  email: null,
  avatar: null,
  stateChange: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      const { userId, login, email, avatar } = action.payload;
      return { ...state, userId, login, email, avatar };
    },

    authStateChange: (state, action) => {
      const { stateChange } = action.payload;
      return { ...state, stateChange };
    },
  },
});

console.log(authSlice);

export const { updateUserProfile, authStateChange } = authSlice.actions;

export const authReducer = authSlice.reducer;
