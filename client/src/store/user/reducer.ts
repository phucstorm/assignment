import { createReducer } from '@reduxjs/toolkit';
import * as thunks from './thunks'
import type { UserState } from './types';

export const initialState: UserState = {};
export default createReducer(initialState, (reducerBuilder) => {
  reducerBuilder.addCase(thunks.fetchUsers.fulfilled, (state, { payload }) => ({
    ...state,
    list: payload,
  }));
});
