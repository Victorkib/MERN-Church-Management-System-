import { createSlice } from '@reduxjs/toolkit';

const isLoggedInSlice = createSlice({
  name: 'isLoggedIn',
  initialState: {
    isLoggedIn: null,
  },
  reducers: {
    setIsloggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    resetIsloggedIn: (state) => {
      state.isLoggedIn = null;
    },
  },
});

export const { setIsloggedIn, resetIsloggedIn } = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;
