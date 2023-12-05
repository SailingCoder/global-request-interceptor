"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var setupFetchInstance = function (config) {
    if (config === void 0) { config = {}; }
    var onRequest = config.onRequest, onResponse = config.onResponse, onError = config.onError;
    var originalFetch = fetch;
    var fetchWithInterceptors = function (url, options) { return __awaiter(void 0, void 0, void 0, function () {
        var requestConfig, _a, requestUrl, requestOptions, response, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    requestConfig = options || {};
                    if (!onRequest) return [3 /*break*/, 2];
                    return [4 /*yield*/, onRequest(__assign({ url: url }, requestConfig))];
                case 1:
                    _a = _b.sent(), requestUrl = _a.url, requestOptions = __rest(_a, ["url"]);
                    url = requestUrl;
                    requestConfig = __assign({}, requestOptions);
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, originalFetch(url, requestConfig)];
                case 3:
                    response = _b.sent();
                    if (onResponse) {
                        response = onResponse(response);
                    }
                    return [2 /*return*/, response];
                case 4:
                    error_1 = _b.sent();
                    if (onError) {
                        onError(error_1);
                    }
                    throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    window.fetch = fetchWithInterceptors;
};
exports.default = setupFetchInstance;
// Example usage:
// setupFetchInterceptors({
//   onRequest: (input, init) => {
//     // Your request interceptor logic
//     return init;
//   },
//   onResponse: (response) => {
//     // Your response interceptor logic
//     return response;
//   },
//   onError: (error) => {
//     // Your error callback logic
//     console.error('An error occurred:', error);
//   },
// });
// Use the fetch function as usual
// fetch('/endpoint1').then(response => console.log(response));
