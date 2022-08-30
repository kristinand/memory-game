import { AnyAction, Reducer, configureStore, combineReducers } from '@reduxjs/toolkit';

import settingsReducer from './settings/slice';
import ratingsReducer from './rating/slice';
import gameReducer from './game/slice';
import authReducer from './auth/slice';

export type RootState = ReturnType<typeof reducers>;

const reducers = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  game: gameReducer,
  ratings: ratingsReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => reducers(state, action);

export const store = configureStore({
  reducer: rootReducer,
});
