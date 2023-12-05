"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAxiosInstance = exports.setupFetchInstance = void 0;
var setupFetchInstance_1 = require("./setupFetchInstance");
exports.setupFetchInstance = setupFetchInstance_1.default;
var setupAxiosInstance_1 = require("./setupAxiosInstance");
exports.setupAxiosInstance = setupAxiosInstance_1.default;
// export function setupGlobalRequestInterceptor({
//   requestCallback,
//   responseCallback,
//   errorCallback,
//   library = 'axios' // 默认使用 axios
// }: {
//   requestCallback: (request: any) => void;
//   responseCallback?: (response: any) => void;
//   errorCallback?: (error: any) => void;
//   library?: 'axios' | 'fetch';
// }) {
//   if (library === 'fetch') {
//     setupFetchInterceptor(requestCallback, responseCallback, errorCallback);
//   } else if (library === 'axios') {
//     setupAxiosInterceptor(requestCallback, responseCallback, errorCallback);
//   } else {
//     console.error('Invalid library specified. Supported libraries are "axios" and "fetch".');
//   }
// }
