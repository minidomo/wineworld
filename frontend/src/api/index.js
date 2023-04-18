import axios from 'axios';

export const wineworld = axios.create({
  baseURL: 'https://api.wineworld.me/',
  paramsSerializer: {
    indexes: null,
  },
});

export const gitlab = axios.create({
  baseURL: 'https://gitlab.com/api/v4/',
  paramsSerializer: {
    indexes: null,
  },
});
