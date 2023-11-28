# Global Request Interceptor

`global-request-interceptor` is a simple and flexible JavaScript library designed for intercepting network requests globally. This library supports both Axios and Fetch, the two major network request methods, allowing you to easily add global processing logic, log requests and responses, handle errors, and enhance the maintainability and flexibility of your application.

### Features

-   **Support for Axios and Fetch:** Provides interceptors for both Axios and Fetch, allowing you to choose to use one or both simultaneously.
-   **Global Interceptors:** Set up request, response, and error interceptors that will be effective across all requests in the entire application.
-   **Flexible Configuration:** Utilize callback functions within interceptors to execute custom logic, such as modifying request configurations, logging, error handling, etc.

## Installation

```bash
npm install global-request-interceptor
```

## Usage

### 1. Using Axios

```javascript
import { setupAxiosInterceptor } from 'global-request-interceptor';

// 调用 setupAxiosInterceptor 设置拦截器
setupAxiosInterceptor(
  // 请求拦截器回调
  config => {
    console.log('Intercepted Axios request:', config);
    // 在这里可以修改请求配置
    return config;
  },
  // 响应拦截器回调
  response => {
    console.log('Intercepted Axios response:', response);
    // 在这里可以修改响应数据
    return response;
  },
  // 错误拦截器回调
  error => {
    console.error('Intercepted Axios error:', error);
    // 在这里可以处理请求或响应发生的错误
    return Promise.reject(error);
  }
);

// Continue with your application logic
```

你可以继续使用 Axios 发送请求，拦截器将在请求过程中执行。

```javascript
axios.get('https://api.example.com/data')
  .then(response => {
    console.log('Axios response:', response.data);
  })
  .catch(error => {
    console.error('Axios error:', error);
  });
```

### 2. Using Fetch

```javascript
import { setupFetchInterceptor } from 'global-request-interceptor';

// 调用 setupFetchInterceptor 设置拦截器
setupFetchInterceptor(
  // 请求拦截器回调
  (url, options) => {
    console.log('Intercepted fetch request:', url, options);
    // 在这里可以修改请求配置
  },
  // 响应拦截器回调
  response => {
    console.log('Intercepted fetch response:', response);
    // 在这里可以修改响应数据
    return response;
  },
  // 错误拦截器回调
  error => {
    console.error('Intercepted fetch error:', error);
    // 在这里可以处理请求或响应发生的错误
    throw error;
  }
);

// Continue with your application logic
```

之后，你可以继续使用 Fetch 发送请求，拦截器将在请求过程中执行。

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

## 许可证

本项目基于 MIT 许可证。有关更多信息，请参阅 LICENSE 文件。
