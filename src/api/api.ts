import axiosBaseQuery from './axiosBaseQuery';
import { ILoadRatingsResponse, IResponse } from './entities';

const api = {
  async loadRatings(): Promise<IResponse<ILoadRatingsResponse>> {
    const result = await axiosBaseQuery<ILoadRatingsResponse>({ url: '/rating' });
    return result;
  },

  async saveScore(data: { player: string; score: number }): Promise<IResponse> {
    const result = await axiosBaseQuery({ url: '/rating', data, method: 'PUT' });
    return result;
  },
};

export default api;
