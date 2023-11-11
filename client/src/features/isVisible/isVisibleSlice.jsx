import { createSlice } from '@reduxjs/toolkit';

const isVisibleSlice = createSlice({
  name: 'isVisible',
  initialState: {
    isVisible: true,
  },
  reducers: {
    setIsVisible: (state) => {
      state.isVisible = false;
    },
    resetIsVisible: (state) => {
      state.isVisible = true;
    },
  },
});
export const { setIsVisible, resetIsVisible } = isVisibleSlice.actions;
export default isVisibleSlice.reducer;
