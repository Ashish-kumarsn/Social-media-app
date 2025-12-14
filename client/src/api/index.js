import axios from 'axios';

const API = axios.create({
  // ✅ Empty string = same domain (goes through Ingress)
  baseURL: '',
});

API.interceptors.request.use(
  (req) => {
    try {
      const raw = localStorage.getItem('store');
      if (raw) {
        const parsed = JSON.parse(raw);
        const token = parsed?.authReducer?.authData?.token;
        if (token) {
          req.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (err) {
      console.error('Token retrieval error:', err);
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export default API;