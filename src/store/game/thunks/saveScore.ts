import { createAsyncThunk } from '@reduxjs/toolkit';

import { savePlayerScore } from 'api/methods';
import { RootState } from 'store';

export const saveScore = createAsyncThunk('user/savePlayerScore', async (score: number, { getState }) => {
  const { auth } = getState() as RootState;
  await savePlayerScore({ player: auth.player, score });
});
