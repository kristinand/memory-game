import { createAsyncThunk } from '@reduxjs/toolkit';

import { getRatings } from 'api/methods';
import { IGetRatingsRequest } from 'api/types';

export const getAllRatings = createAsyncThunk('user/getAllRatings', async (params: IGetRatingsRequest) =>
  getRatings(params),
);
