import type { Action, Store as ReduxStore } from '@reduxjs/toolkit';
import type { ThunkDispatch } from 'redux-thunk';
import type rootReducer from './rootReducer';

export type RootStates = ReturnType<typeof rootReducer>;

export type RootStoreDispatch = ThunkDispatch<RootStates, void, Action>;

export type Store = ReduxStore<RootStates, Action> & {
  dispatch: RootStoreDispatch;
};
