import axios from 'axios';

const instance = axios.create();

// attach token (if any) the first time this file is imported
const token = localStorage.getItem('token');
if (token) instance.defaults.headers.common.Authorization = `Bearer ${token}`;

export const setAuthToken = (tok) => {
  if (tok) {
    localStorage.setItem('token', tok);
    instance.defaults.headers.common.Authorization = `Bearer ${tok}`;
  } else {
    localStorage.removeItem('token');
    delete instance.defaults.headers.common.Authorization;
  }
};

export default instance;
