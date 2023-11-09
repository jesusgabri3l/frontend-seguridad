import axios from 'axios';
import { getCookie } from '../utils/cookies';

const apiURL = import.meta.env.VITE_API;

function getHeaders () {
  const cookie = getCookie('jwt');
  return {
    'Content-Type': 'application/json',
    'Auth': cookie
  };
}

export const api = axios.create({
  baseURL: apiURL
});

export default {
  URL,
  gettAllUsers () {
    return api.get('user',{ headers: getHeaders() });
  },
};