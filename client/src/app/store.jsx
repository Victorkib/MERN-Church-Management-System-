import { configureStore } from '@reduxjs/toolkit';
import isLoggedInSlice from '../features/isLoggedIn/isLoggedInSlice';
import userNameSlice from '../features/userName/userNameSlice';
import isVisibleSlice from '../features/isVisible/isVisibleSlice';

export const store = configureStore({
  reducer: {
    isLoggedInValue: isLoggedInSlice,
    userNameValue: userNameSlice,
    isVisibleValue: isVisibleSlice,
  },
});
