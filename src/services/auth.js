import axios from 'axios';

const apiURL = import.meta.env.VITE_API;

function getHeaders () {
  return {
    'Content-Type': 'application/json'
  };
}

export const api = axios.create({
  baseURL: apiURL
});


export default {
  URL,
  loginService (credentials) {
    return api.post('user/login', {...credentials},{ headers: getHeaders() });
  },
  registerService (formData) {
    return api.post('user', {...formData},{ headers: getHeaders() });
  },
};