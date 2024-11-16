import { configureStore } from '@reduxjs/toolkit';
import userReducer from './createSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
