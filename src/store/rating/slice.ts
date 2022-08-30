import { createSlice } from '@reduxjs/toolkit';

import { IGetRatingsResponse, IPlayerRatingResponse } from 'api/entities';
import { getAllRatings } from 'store/rating/thunks/getRatings';
import { getRating } from 'store/rating/thunks/getPlayerRatings';
import { RootState } from '..';

interface IRating {
  playerRating: IPlayerRatingResponse | null;
  allRatings: IGetRatingsResponse | null;
}

const initialState: IRating = {
  playerRating: null,
  allRatings: null,
};

export const slice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllRatings.fulfilled, (state, { payload }) => {
      state.allRatings = payload.content;
    });

    builder.addCase(getRating.fulfilled, (state, { payload }) => {
      state.playerRating = payload.content;
    });
  },
});

export const selectAllRatings = (state: RootState): IGetRatingsResponse | null => state.ratings.allRatings;
export const selectPlayerRating = (state: RootState): IPlayerRatingResponse | null => state.ratings.playerRating;

export default slice.reducer;
