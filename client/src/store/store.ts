import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { Store } from './types';

const store = configureStore({
  reducer: rootReducer
}) as Store;

export default store;
