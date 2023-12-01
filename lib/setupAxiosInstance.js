"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
// Create Axios instances with interceptors
var setupAxiosInstance = function (config) {
    if (config === void 0) { config = {}; }
    var instances = config.instances, defaultOptions = config.defaultOptions, onRequest = config.onRequest, onResponse = config.onResponse, onError = config.onError;
    var axiosInstances;
    if (Array.isArray(instances)) {
        axiosInstances = instances;
    }
    else {
        axiosInstances = instances ? [instances] : [axios_1.default.create(defaultOptions || {})];
    }
    if (Array.isArray(axiosInstances)) {
        axiosInstances.forEach(function (instance) {
            // Request interceptor
            if (onRequest) {
                instance.interceptors.request.use(function (config) { return onRequest(config); }, function (error) { return Promise.reject(error); });
            }
            // Response interceptor
            if (onResponse) {
                instance.interceptors.response.use(function (response) { return onResponse(response); }, function (error) { return Promise.reject(error); });
            }
            // Error callback
            if (onError) {
                instance.interceptors.response.use(function (response) { return response; }, function (error) {
                    onError(error);
                    return Promise.reject(error);
                });
            }
        });
    }
    return axiosInstances.length === 1 ? axiosInstances[0] : axiosInstances;
};
// Export the wrapped Axios instances
exports.default = setupAxiosInstance;
