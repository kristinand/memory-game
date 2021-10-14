import { IRating } from 'entities/interfaces';
import axiosBaseQuery from './axiosBaseQuery';

const api = {
  async loadRatings(): Promise<IRating[]> {
    const result = await axiosBaseQuery({ url: '/rating' });
    return result.data as IRating[];
  },

  async saveScore(data: { player: string; score: number }): Promise<void> {
    await axiosBaseQuery({ url: '/game', data, method: 'PUT' });
  },
};

export default api;
