// client/src/api/PostRequest.js
import API from './index.js';

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);

export const likePost = (id, userId) => API.put(`/post/${id}/like_dislike`, { userId });
