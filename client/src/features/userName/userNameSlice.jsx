import { createSlice } from '@reduxjs/toolkit';

const userNameSlice = createSlice({
  name: 'userNameValue',
  initialState: {
    userName: null,
  },
  reducers: {
    setUsersName: (state, action) => {
      state.userName = action.payload;
    },
    resetUserName: (state) => {
      state.userName = null;
    },
  },
});
export const { setUsersName, resetUserName } = userNameSlice.actions;
export default userNameSlice.reducer;
