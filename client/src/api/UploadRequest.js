// client/src/api/UploadRequest.js
import API from './index.js';

/*
  uploadImage expects a FormData instance, e.g.:
  const fd = new FormData();
  fd.append('file', file);
  // if backend expects other fields include them in fd
  uploadImage(fd);
*/
export const uploadImage = (formData) => API.post('/upload', formData);

// uploadPost typically sends JSON (post content + image filename or url)
export const uploadPost = (data) => API.post('/post', data);
