import { createAsyncThunk } from '@reduxjs/toolkit';

import { savePlayerScore } from 'api/methods';
import { ISavePlayerScoreRequest } from 'api/entities';

export const saveScore = createAsyncThunk('user/savePlayerScore', async (data: ISavePlayerScoreRequest) =>
  savePlayerScore(data),
);
