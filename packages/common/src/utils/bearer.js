import Cookies from 'universal-cookie';
import { TOKENS } from '../constants';

export const getBearerToken = (ctx) => {
  return new Cookies(ctx?.req?.headers?.cookie).get(TOKENS.BEARER_TOKEN);
};

export const getBearerHeaders = (ctx) => {
  const bearerToken = getBearerToken(ctx);

  return {
    ...bearerToken && {
      Authorization: `Bearer ${bearerToken}`
    }
  };
};

export const getHeaders = ({ headers }) => {
  return {
    ...headers,
    'Content-Type': 'application/json'
  };
};

export default {
  getBearerToken,
  getBearerHeaders,
  getHeaders,
};
