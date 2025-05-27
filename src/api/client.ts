import axios from 'axios';
import { useAuthStore } from '../store/auth';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

client.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
