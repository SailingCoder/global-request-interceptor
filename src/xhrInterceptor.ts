/*
 * @Author: wangjunjie9
 * @Date: 2023-11-29 09:54:30
 * @LastEditors: wangjunjie9
 * @LastEditTime: 2023-11-29 09:55:30
 * @Descripttion: 
 * @FilePath: /global-request-interceptor/src/xhrInterceptor.ts
 */
// xhrInterceptor.ts
export function setupXhrInterceptor(requestCallback: any, responseCallback: any, errorCallback: any) {
    const originalXhrOpen = XMLHttpRequest.prototype.open;
  
    XMLHttpRequest.prototype.open = function (method, url) {
      this._url = url; // 记录请求的URL
      return originalXhrOpen.apply(this, arguments);
    };
  
    this.addEventListener('load', function () {
      if (responseCallback) {
        const response = {
          status: this.status,
          statusText: this.statusText,
          response: this.response,
          responseText: this.responseText,
          responseType: this.responseType,
        };
        responseCallback(response);
      }
    });
  
    this.addEventListener('error', function () {
      if (errorCallback) {
        const error = {
          status: this.status,
          statusText: this.statusText,
          response: this.response,
          responseText: this.responseText,
          responseType: this.responseType,
        };
        errorCallback(error);
      }
    });
  
    this.addEventListener('abort', function () {
      if (errorCallback) {
        const error = {
          status: this.status,
          statusText: this.statusText,
          response: this.response,
          responseText: this.responseText,
          responseType: this.responseType,
        };
        errorCallback(error);
      }
    });
  }
  