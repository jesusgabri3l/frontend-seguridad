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
/*
api.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && UserStore.getRefreshToken() && error.response.data.error.message === 'The access token expired') {
      const { data } = await auth.refreshToken();
      UserStore.setAuth({ accessToken: data.access_token, refreshToken: data.refresh_token });
      const accessToken = getHeaders();
      originalRequest.headers.Authorization = accessToken.Authorization;
      return api(originalRequest);
    } else {
      return Promise.reject(error);
    }
  }
});
*/

export default {
  URL,
  loginService (credentials) {
    return api.post('user/login', {...credentials},{ headers: getHeaders() });
  },
};