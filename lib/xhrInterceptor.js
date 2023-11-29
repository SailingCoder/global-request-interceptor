"use strict";
// xhrInterceptor.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupXhrInterceptor = void 0;
function setupXhrInterceptor(requestCallback, responseCallback, errorCallback) {
    var originalOpen = XMLHttpRequest.prototype.open;
    var originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
        if (async === void 0) { async = true; }
        if (requestCallback) {
            requestCallback(this);
        }
        return originalOpen.call(this, method, url, async, user, password);
    };
    this.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
            if (responseCallback) {
                responseCallback(this);
            }
        }
    });
    XMLHttpRequest.prototype.send = function (data) {
        try {
            return originalSend.call(this, data);
        }
        catch (error) {
            if (errorCallback) {
                errorCallback(error);
            }
            throw error;
        }
    }; // 解决类型错误
}
exports.setupXhrInterceptor = setupXhrInterceptor;
