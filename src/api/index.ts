import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://15.165.157.131:8080',
});
