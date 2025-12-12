// client/src/api/index.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
});

API.interceptors.request.use(
  (req) => {
    try {
      const raw = localStorage.getItem('profile');
      if (raw) {
        const token = JSON.parse(raw).token;
        if (token) req.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export default API;
