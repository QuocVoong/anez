import { axios, API } from '@anez/common';

export const login = async({ url, data }) => {
  const { data: response } = await axios.request({ method: 'post', url: url || API.LOGIN, data });
  return response;
};

export default {
  login
};
