"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGlobalRequestInterceptor = exports.setupAxiosInterceptor = exports.setupFetchInterceptor = void 0;
var fetchInterceptor_1 = require("./fetchInterceptor");
Object.defineProperty(exports, "setupFetchInterceptor", { enumerable: true, get: function () { return fetchInterceptor_1.setupFetchInterceptor; } });
var axiosInterceptor_1 = require("./axiosInterceptor");
Object.defineProperty(exports, "setupAxiosInterceptor", { enumerable: true, get: function () { return axiosInterceptor_1.setupAxiosInterceptor; } });
function setupGlobalRequestInterceptor(_a) {
    var requestCallback = _a.requestCallback, responseCallback = _a.responseCallback, errorCallback = _a.errorCallback, _b = _a.library // 默认使用 axios
    , library = _b === void 0 ? 'axios' : _b // 默认使用 axios
    ;
    if (library === 'fetch') {
        (0, fetchInterceptor_1.setupFetchInterceptor)(requestCallback, responseCallback, errorCallback);
    }
    else if (library === 'axios') {
        (0, axiosInterceptor_1.setupAxiosInterceptor)(requestCallback, responseCallback, errorCallback);
    }
    else {
        console.error('Invalid library specified. Supported libraries are "axios" and "fetch".');
    }
}
exports.setupGlobalRequestInterceptor = setupGlobalRequestInterceptor;
