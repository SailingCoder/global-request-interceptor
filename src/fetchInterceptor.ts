// fetchInterceptor.js

let originalFetch = window.fetch;

export function setupFetchInterceptor(requestCallback?:any, responseCallback?:any, errorCallback?:any) {
  window.fetch = function(url, options) {
    try {
      if (requestCallback) {
        requestCallback(url, options);
      }

      return originalFetch(url, options)
        .then(response => {
          if (responseCallback) {
            responseCallback(response);
          }
          return response;
        })
        .catch(error => {
          if (errorCallback) {
            errorCallback(error);
          }
          throw error;
        });
    } catch (error) {
      if (errorCallback) {
        errorCallback(error);
      }
      return Promise.reject(error);
    }
  };
}
