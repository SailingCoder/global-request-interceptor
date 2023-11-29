# Global Request Interceptor

[简体中文](./doc/README_ZH.md)  <!-- 添加跳转链接 -->

`global-request-interceptor` is a simple yet flexible JavaScript library designed for intercepting network requests globally. This library supports Axios, Fetch, and XMLHttpRequest (XHR), allowing you to easily add global processing logic, log requests and responses, handle errors, and enhance the maintainability and flexibility of your application.

### Features

-   **Support for Axios, Fetch, and XHR:** Provides interceptors for Axios, Fetch, and XHR, giving you the option to use one, two, or all three simultaneously.
-   **Global Interceptors:** Set up request, response, and error interceptors that will take effect across all requests in your entire application.
-   **Flexible Configuration:** Through callback functions, you can execute custom logic within interceptors, such as modifying request configurations, logging, error handling, and more.

### Installation

Install using npm:

```bash
npm install global-request-interceptor
```

### Usage

#### Global Interception with Axios

```javascript
import { setupAxiosInterceptor } from 'global-request-interceptor';

setupAxiosInterceptor({
  requestCallback: config => {
    console.log('Intercepted Axios request:', config);
    // Customize request configuration here
    // e.g., config.url += '?token=123456789'; config.url = 'https://****.com/' + config.url;
    return config;
  },
  responseCallback: response => {
    console.log('Intercepted Axios response:', response);
    // Customize response data here
    return response;
  },
  errorCallback: error => {
    console.error('Intercepted Axios error:', error);
    // Handle errors that occur during request or response
    return Promise.reject(error);
  }
});
```

You can continue using Axios to send requests, and the interceptors will execute during the request process.

```javascript
axios.get('https://api.example.com/data')
  .then(response => {
    console.log('Axios response:', response.data);
  })
  .catch(error => {
    console.error('Axios error:', error);
  });
```

#### Global Interception with Fetch

```javascript
import { setupFetchInterceptor } from 'global-request-interceptor';

setupFetchInterceptor(
  // Request interceptor callback
  (url, options) => {
    console.log('Intercepted fetch request:', url, options);
    // Customize request configuration here
    // e.g., url += '?token=123456789'; url = 'https://****.com/' + url;
  },
  // Response interceptor callback
  response => {
    console.log('Intercepted fetch response:', response);
    // Customize response data here
    return response;
  },
  // Error interceptor callback
  error => {
    console.error('Intercepted fetch error:', error);
    // Handle errors that occur during request or response
    throw error;
  }
);
```

Afterwards, you can continue using Fetch to send requests, and the interceptors will execute during the request process.

```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    console.log('Fetch response:', data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
```

#### Global Interception with XHR

```javascript
import { setupXhrInterceptor } from 'global-request-interceptor';

setupXhrInterceptor(
  // Request interceptor callback
  info => {
    console.log('Intercepted XHR request:', info);
    // Customize request configuration here
    // e.g., info.url += '?token=123456789'; info.url = 'https://****.com/' + info.url;
  },
  // Response interceptor callback
  info => {
    console.log('Intercepted XHR response:', info);
    // Customize response data here
  },
  // Error interceptor callback
  error => {
    console.error('Intercepted XHR error:', error);
    // Handle errors that occur during request or response
    throw error;
  }
);
```

## License

This project is licensed under the MIT License. For more information, please see the LICENSE file.
