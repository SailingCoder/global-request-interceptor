"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
// Create an Axios instance with interceptors
var setupAxiosInstance = function (config) {
    var axiosInstance = config.axiosInstance, options = config.options, requestInterceptor = config.requestInterceptor, responseInterceptor = config.responseInterceptor, errorCallback = config.errorCallback;
    var instance = axiosInstance || axios_1.default.create(options);
    // Request interceptor
    if (requestInterceptor) {
        instance.interceptors.request.use(function (config) { return requestInterceptor(config); }, function (error) { return Promise.reject(error); });
        axios_1.default.interceptors.request.use(function (config) { return requestInterceptor(config); }, function (error) { return Promise.reject(error); });
    }
    // Response interceptor
    if (responseInterceptor) {
        instance.interceptors.response.use(function (response) { return responseInterceptor(response); }, function (error) { return Promise.reject(error); });
        axios_1.default.interceptors.response.use(function (response) { return responseInterceptor(response); }, function (error) { return Promise.reject(error); });
    }
    // Error callback
    if (errorCallback) {
        instance.interceptors.response.use(function (response) { return response; }, function (error) {
            errorCallback(error);
            return Promise.reject(error);
        });
        axios_1.default.interceptors.response.use(function (response) { return response; }, function (error) {
            errorCallback(error);
            return Promise.reject(error);
        });
    }
    return instance;
};
// Export the wrapped Axios instance
exports.default = setupAxiosInstance;
// import axios from 'axios'
// import { setupAxiosInstance } from 'global-request-interceptor'
// const customInstance = axios.create({
//   baseURL: 'https://api.example.com',
//   timeout: 5000
// })
// // 使用 setupAxiosInstance 函数创建实例，传递配置对象
// const myAxios = setupAxiosInstance({
//   axiosInstance: customInstance, // 使用用户提供的 axios 实例，不传会生成一个新的 axios 实例
//   requestInterceptor: (config) => {
//     console.log('请求拦截器:', config)
//     return config
//   },
//   responseInterceptor: (response) => {
//     console.log('响应拦截器:', response)
//     return response
//   },
//   errorCallback: (error) => {
//     console.error('发生错误:', error)
//     // 在这里添加自定义的异常处理逻辑
//   }
// })
// // 使用实例进行请求
// myAxios.get('/data')
//   .then((response) => {
//     console.log(response.data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })
// // 使用原始的 axios 实例进行请求
// axios.get('/data')
//   .then((response) => {
//     console.log(response.data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })
// // 使用实例进行请求和使用原始的 axios 实例进行请求的结果是一样的，都可以被拦截到
