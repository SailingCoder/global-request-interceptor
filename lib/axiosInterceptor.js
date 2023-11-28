"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAxiosInterceptor = void 0;
// axiosInterceptor.js
var axios_1 = require("axios");
function setupAxiosInterceptor(requestCallback, responseCallback, errorCallback) {
    axios_1.default.interceptors.request.use(function (config) {
        if (requestCallback) {
            requestCallback(config);
        }
        return config;
    }, function (error) {
        if (errorCallback) {
            errorCallback(error);
        }
        return Promise.reject(error);
    });
    axios_1.default.interceptors.response.use(function (response) {
        if (responseCallback) {
            responseCallback(response);
        }
        return response;
    }, function (error) {
        if (errorCallback) {
            errorCallback(error);
        }
        return Promise.reject(error);
    });
}
exports.setupAxiosInterceptor = setupAxiosInterceptor;
