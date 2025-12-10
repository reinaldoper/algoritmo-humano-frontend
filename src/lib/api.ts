import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const api =  axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default api;
