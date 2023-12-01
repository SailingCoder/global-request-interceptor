"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var setupXhrInstance = function (config) {
    var requestInterceptor = config.requestInterceptor, // 请求拦截器
    responseInterceptor = config.responseInterceptor, // 响应拦截器
    errorCallback = config.errorCallback // Xhr 错误
    ;
    var xhr = new XMLHttpRequest();
    var interceptedXhr = function (method, url, data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    // 配置请求
                    xhr.open(method, url, true);
                    // 请求拦截器
                    if (requestInterceptor) {
                        requestInterceptor(xhr);
                    }
                    // 设置响应处理函数
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            // 响应拦截器
                            if (responseInterceptor) {
                                responseInterceptor(xhr);
                            }
                            if (xhr.status >= 200 && xhr.status < 300) {
                                resolve(xhr);
                            }
                            else {
                                reject(xhr);
                            }
                        }
                    };
                    // 错误处理函数
                    xhr.onerror = function () {
                        if (errorCallback) {
                            errorCallback(xhr);
                        }
                        reject(xhr);
                    };
                    // 发送请求
                    xhr.send(data);
                })];
        });
    }); };
    return interceptedXhr;
};
exports.default = setupXhrInstance;
// import { setupXhrInstance } from 'global-request-interceptor'
// 使用 setupXhrInstance 进行配置
// const customXhr = setupXhrInstance({
//   requestInterceptor: (xhr) => {
//     console.log('Request interceptor:', xhr)
//     // 可以在这里修改请求
//   },
//   responseInterceptor: (xhr) => {
//     console.log('Response interceptor:', xhr)
//     // 可以在这里修改响应
//   },
//   errorCallback: (xhr) => {
//     console.error('Error occurred:', xhr)
//     // 在这里添加自定义的异常处理逻辑
//   }
// })
// // 使用 customXhr 进行请求
// customXhr('GET', 'https://api.example.com/data', null)
//   .then((xhr) => {
//     console.log(xhr.responseText)
//   })
//   .catch((xhr) => {
//     console.error('Request failed:', xhr)
//   })
// import { setupXhrInterceptor } from 'global-request-interceptor';
// setupXhrInterceptor(
//   // Request interceptor callback
//   info => {
//     console.log('Intercepted XHR request:', info);
//     // Customize request configuration here
//     // e.g., info.url += '?token=123456789'; info.url = 'https://****.com/' + info.url;
//   },
//   // Response interceptor callback
//   info => {
//     console.log('Intercepted XHR response:', info);
//     // Customize response data here
//   },
//   // Error interceptor callback
//   error => {
//     console.error('Intercepted XHR error:', error);
//     // Handle errors that occur during request or response
//     throw error;
//   }
// );
