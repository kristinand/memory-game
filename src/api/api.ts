import axiosBaseQuery from './axiosBaseQuery';
import { ILoadRatingsResponse, IPlayerRatingResponse, IResponse } from './entities';

const api = {
  async loadRatings(params: { page?: number; limit?: number }): Promise<IResponse<ILoadRatingsResponse>> {
    const result = await axiosBaseQuery<ILoadRatingsResponse>({ url: '/rating', params });
    return result;
  },

  async loadPlayerRating(playerName: string): Promise<IResponse<IPlayerRatingResponse>> {
    const result = await axiosBaseQuery<IPlayerRatingResponse>({ url: `/rating/${playerName}` });
    return result;
  },

  async saveScore(data: { player: string; score: number }): Promise<IResponse> {
    const result = await axiosBaseQuery({ url: '/rating', data, method: 'PUT' });
    return result;
  },
};

export default api;
