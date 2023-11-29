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
var setupFetchInstance = function (config) {
    var fetchInstance = config.fetchInstance, // Fetch 实例
    requestInterceptor = config.requestInterceptor, // 请求拦截器
    responseInterceptor = config.responseInterceptor, // 响应拦截器
    errorCallback = config.errorCallback // Fetch 错误
    ;
    var instance = fetchInstance || fetch;
    var interceptedFetch = function (url, options) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, newUrl, newOptions, response, _b, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 7, , 8]);
                    if (!requestInterceptor) return [3 /*break*/, 2];
                    return [4 /*yield*/, requestInterceptor(url, options)];
                case 1:
                    _a = _c.sent(), newUrl = _a[0], newOptions = _a[1];
                    url = newUrl;
                    options = newOptions || options;
                    _c.label = 2;
                case 2: return [4 /*yield*/, instance(url, options)];
                case 3:
                    response = _c.sent();
                    if (!responseInterceptor) return [3 /*break*/, 5];
                    return [4 /*yield*/, responseInterceptor(response)];
                case 4:
                    _b = _c.sent();
                    return [3 /*break*/, 6];
                case 5:
                    _b = response;
                    _c.label = 6;
                case 6: return [2 /*return*/, _b];
                case 7:
                    error_1 = _c.sent();
                    if (errorCallback) {
                        errorCallback(error_1);
                    }
                    throw error_1;
                case 8: return [2 /*return*/];
            }
        });
    }); };
    return interceptedFetch;
};
exports.default = setupFetchInstance;
// import { setupAxiosInstance } from 'global-request-interceptor'
// 使用 setupXhrInstance 进行配置
// const customFetch = setupAxiosInstance({
//   requestInterceptor: async (url:string, options:any) => {
//     console.log('Request interceptor:', url, options)
//     // 可以在这里修改请求
//     return [url, options]
//   },
//   responseInterceptor: async (response: any) => {
//     console.log('Response interceptor:', response)
//     // 可以在这里修改响应
//     return response
//   },
//   errorCallback: (error: any) => {
//     console.error('Error occurred:', error)
//     // 在这里添加自定义的异常处理逻辑，例如提示错误信息
//   }
// })
// // 使用 customFetch 进行请求
// customFetch('https://api.example.com/data')
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })
