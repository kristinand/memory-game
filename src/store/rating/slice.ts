import { createSlice } from '@reduxjs/toolkit';

import { IGetRatingsResponse, IPlayerRatingResponse } from 'api/types';
import { getAllRatings } from 'store/rating/thunks/getRatings';
import { getRating } from 'store/rating/thunks/getPlayerRatings';
import { RootState } from '..';

interface IRating {
  isLoading: boolean;
  playerRating: IPlayerRatingResponse | null;
  allRatings: IGetRatingsResponse | null;
}

const initialState: IRating = {
  isLoading: false,
  playerRating: null,
  allRatings: null,
};

export const slice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllRatings.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllRatings.fulfilled, (state, { payload }) => {
      state.allRatings = payload.content;
      state.isLoading = false;
    });

    builder.addCase(getRating.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRating.fulfilled, (state, { payload }) => {
      state.playerRating = payload.content;
      state.isLoading = false;
    });
  },
});

export const selectIsLoading = (state: RootState): boolean => state.ratings.isLoading;
export const selectAllRatings = (state: RootState): IGetRatingsResponse | null => state.ratings.allRatings;
export const selectPlayerRating = (state: RootState): IPlayerRatingResponse | null => state.ratings.playerRating;

export default slice.reducer;
