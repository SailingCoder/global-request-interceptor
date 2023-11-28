"use strict";
// fetchInterceptor.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupFetchInterceptor = void 0;
var originalFetch = window.fetch;
function setupFetchInterceptor(requestCallback, responseCallback, errorCallback) {
    window.fetch = function (url, options) {
        try {
            if (requestCallback) {
                requestCallback(url, options);
            }
            return originalFetch(url, options)
                .then(function (response) {
                if (responseCallback) {
                    responseCallback(response);
                }
                return response;
            })
                .catch(function (error) {
                if (errorCallback) {
                    errorCallback(error);
                }
                throw error;
            });
        }
        catch (error) {
            if (errorCallback) {
                errorCallback(error);
            }
            return Promise.reject(error);
        }
    };
}
exports.setupFetchInterceptor = setupFetchInterceptor;
