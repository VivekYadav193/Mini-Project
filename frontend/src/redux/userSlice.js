// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('userState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('userState', serializedState);
  } catch (err) {
    // Handle errors
  }
};

const initialState = {
  user: null,
  otp: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: loadState() || initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      saveState(state);
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
      saveState(state);
    },
  },
});

export const { setUser, setOtp } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectOtp = (state) => state.user.otp;

export default userSlice.reducer;
