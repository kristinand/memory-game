import { createAsyncThunk } from '@reduxjs/toolkit';

import { getRatings } from 'api/methods';
import { IGetRatingsRequest } from 'api/entities';

export const getAllRatings = createAsyncThunk('user/getAllRatings', async (params: IGetRatingsRequest) =>
  getRatings(params),
);
