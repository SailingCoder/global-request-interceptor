// axiosInterceptor.js
import axios from 'axios';

export function setupAxiosInterceptor(requestCallback:any, responseCallback:any, errorCallback:any) {
  axios.interceptors.request.use(
    config => {
      if (requestCallback) {
        requestCallback(config);
      }
      return config;
    },
    error => {
      if (errorCallback) {
        errorCallback(error);
      }
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    response => {
      if (responseCallback) {
        responseCallback(response);
      }
      return response;
    },
    error => {
      if (errorCallback) {
        errorCallback(error);
      }
      return Promise.reject(error);
    }
  );
}
