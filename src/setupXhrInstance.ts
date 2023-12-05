interface XhrInstanceConfig {
  onRequest?: (xhr: XMLHttpRequest) => void;
  onResponse?: (response: Response) => void;
  onError?: (error: any) => void;
}

const setupXhrInstance = (config: XhrInstanceConfig) => {
  const {
    onRequest,
    onResponse,
    onError
  } = config;

  return async (url: string, options: RequestInit = {}): Promise<Response> => {
    // 创建 XMLHttpRequest 实例
    const xhr = new XMLHttpRequest();

    // 设置请求方法，默认为 GET
    const method = options.method || 'GET';

    // 处理请求头
    const setHeaders = (headers: Headers) => {
      if (headers) {
        for (const [header, value] of Object.entries(headers)) {
          xhr.setRequestHeader(header, value.toString());
        }
      }
    };

    // 处理请求体
    const body = options.body;
    if (body) {
      xhr.send(body);
    } else {
      xhr.send();
    }

    // 在请求前执行全局操作
    if (onRequest) {
      onRequest(xhr);
    }

    // 返回 Promise，以便链式调用
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
          if (this.status >= 200 && this.status < 300) {
            const response = new Response(this.responseText, {
              status: this.status,
              statusText: this.statusText,
              headers: this.getAllResponseHeaders()
            });

            // 在响应后执行全局操作
            if (onResponse) {
              onResponse(response);
            }

            resolve(response);
          } else {
            const error = new Error('XHR request failed');
            // 在错误时执行全局操作
            if (onError) {
              onError(error);
            }
            reject(error);
          }
        }
      };

      // 设置请求超时时间
      if (options.timeout) {
        xhr.timeout = options.timeout;
      }

      // 设置是否异步
      const async = options.async !== false;
      xhr.open(method, url, async);

      // 设置请求头
      if (options.headers) {
        setHeaders(options.headers);
      }

      // 使用对象属性的方式设置请求头
      if (options.headers) {
        // 使用对象属性的方式设置请求头
        xhr.headers = options.headers;
      }
    });
  };
};

export default setupXhrInstance;
