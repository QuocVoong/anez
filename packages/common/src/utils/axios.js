import axios from 'axios';
import { getBearerToken } from './bearer';
import { removeCookie } from './cookie';
import { TOKENS } from '../constants';

export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3001/';

axios.interceptors.request.use((request) => {
  const bearerToken = getBearerToken(request);
  if (bearerToken) {
    request.headers.Authorization = `Bearer ${bearerToken}`;
  }

  return request;
}, (error) => Promise.reject(error));

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response?.status === 401) {
    removeCookie(TOKENS.BEARER_TOKEN);
  }
  return Promise.reject(error);
});

export const request = ({
  url,
  method,
  params,
  headers = {
    'Content-Type': 'application/json',
  },
  data,
  cancelToken
}) => {
  return axios({
    method: method || 'get',
    url: `${API_ENDPOINT}${url}`,
    params,
    headers,
    data,
    cancelToken
  });
};

export default {
  request
};
