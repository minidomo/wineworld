import axios from 'axios';

export const wineworld = axios.create({
  baseURL: 'https://api.wineworld.me/',
});

export const gitlab = axios.create({
  baseURL: 'https://gitlab.com/api/v4/',
});
