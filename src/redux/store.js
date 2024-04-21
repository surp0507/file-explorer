import { configureStore } from '@reduxjs/toolkit';
import explorerReducer from './explorerSlice';

const store = configureStore({
  reducer: {
    explorer: explorerReducer,
  },
});

export default store;
