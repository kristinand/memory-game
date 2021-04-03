import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/',
});

const api = {
  async loadRatings() {
    const res = await instance.get('/rating');
    return res.data;
  },

  async saveScore(body) {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const res = await instance.put('/game', body, config);
    return res.data;
  },
};

export default api;
