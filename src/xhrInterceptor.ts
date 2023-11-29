// xhrInterceptor.ts

export function setupXhrInterceptor(this: any, 
  requestCallback?: (xhr: XMLHttpRequest) => void,
  responseCallback?: (xhr: XMLHttpRequest) => void,
  errorCallback?: (error: any) => void
) {
  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (
    method: string,
    url: string | URL,
    async: boolean = true,
    user?: string | null,
    password?: string | null
  ) {
    if (requestCallback) {
      requestCallback(this);
    }
    return originalOpen.call(this, method, url, async, user, password);
  };

  this.addEventListener('readystatechange', function (this: XMLHttpRequest) {
    if (this.readyState === 4) {
      if (responseCallback) {
        responseCallback(this);
      }
    }
  });

  XMLHttpRequest.prototype.send = function (
    data?: any
  ) {
    try {
      return originalSend.call(this, data);
    } catch (error) {
      if (errorCallback) {
        errorCallback(error);
      }
      throw error;
    }
  } as (this: XMLHttpRequest, data?: Document | BodyInit | null) => void; // 解决类型错误
}
