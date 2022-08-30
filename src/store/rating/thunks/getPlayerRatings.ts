import { createAsyncThunk } from '@reduxjs/toolkit';

import { getPlayerRating } from 'api/methods';

export const getRating = createAsyncThunk('user/getPlayerRating', async (player: string) => getPlayerRating(player));
