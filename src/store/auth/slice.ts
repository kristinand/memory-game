import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '..';

export interface IAuth {
  player: string;
}

const initialState: IAuth = {
  player: '',
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, { payload }: { payload: string }) {
      state.player = payload;
    },
    logout(state) {
      state.player = '';
    },
  },
});

export const {
  login,
  logout,
} = slice.actions;

export const selectPlayerName = (state: RootState): string => state.auth.player;

export default slice.reducer;
