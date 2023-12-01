# 全局请求拦截器

[Read English](../README.md)  <!-- 添加跳转链接 -->

[![npm version](https://badge.fury.io/js/global-request-interceptor.svg)](https://badge.fury.io/js/global-request-interceptor)

`global-request-interceptor` 是一个简单灵活的 JavaScript 库，用于在全局范围内拦截网络请求。该库支持 Axios、Fetch 和 XMLHttpRequest (XHR) 三种主流的网络请求方式，让你能够方便地添加全局处理逻辑、记录请求和响应、处理错误等，提高了应用程序的可维护性和灵活性。

### 特性

-   **支持 Axios、Fetch 和 XHR：** 为 Axios、Fetch 和 XHR 提供拦截器，可选择同时使用一个、两个或所有三个。
-   **全局拦截器：** 可以设置请求拦截、响应拦截和错误拦截器，这些拦截器将在整个应用程序的所有请求中生效。
-   **灵活的配置：** 通过回调函数，您可以在拦截器中执行自定义逻辑，例如修改请求配置、记录日志、处理错误等。


### 安装

使用 npm 进行安装：

```bash
npm install global-request-interceptor
```

使用 yarn 进行安装：

```bash
yarn add global-request-interceptor
```

## Axios 的全局拦截

### 使用

1. 为多个实例设置拦截器：
```javascript
import { setupAxiosInterceptor } from 'global-request-interceptor';

// 多实例配置示例
setupAxiosInterceptor({
  instances: [axiosInstance1, axiosInstance2],
  onRequest: (config) => {
    // 您的请求拦截器逻辑
    // config.url += '?token=123456789'; 
    // config.headers['Sailing'] = 'abc';
    return config;
  },
  onResponse: (response) => {
    // 您的响应拦截器逻辑
    return response;
  },
  onError: (error) => {
    // 您的错误处理逻辑
    console.error('发生错误:', error);
  },
});
```

之后，您可以继续使用 Axios 发送请求，拦截器将在请求过程中执行。

```javascript
axiosInstance1.get('https://api.example.com/data')
  .then(response => {
    console.log('Axios response:', response.data);
  })
  .catch(error => {
    console.error('Axios error:', error);
  });
axiosInstance2.post('https://api.example.com/data')
```

2.  为单个实例设置拦截器：

```javascript
import { setupAxiosInterceptor } from 'global-request-interceptor';

// 单实例配置示例
setupAxiosInterceptor({
  instances: axiosInstance,
  onRequest: (config) => {
    // 您的请求拦截器逻辑
    // config.url += '?token=123456789'; 
    // config.headers['Sailing'] = 'abc';
    return config;
  },
  onResponse: (response) => {
    // 您的响应拦截器逻辑
    return response;
  },
  onError: (error) => {
    // 您的错误处理逻辑
    console.error('发生错误:', error);
  },
});
```

之后，您可以继续使用 Axios 发送请求，拦截器将在请求过程中执行。

```javascript
axiosInstance.get('https://api.example.com/data')
```

3. 创建新实例，设置默认选项并设置拦截器：

```javascript
import { setupAxiosInterceptor } from 'global-request-interceptor';

// 创建带有默认选项的新实例配置示例
const myAxios = setupAxiosInterceptor({
  defaultOptions: { baseURL: 'https://api.example.com' },
  onRequest: (config) => {
    // 您的请求拦截器逻辑
    // config.url += '?token=123456789'; 
    // config.headers['Sailing'] = 'abc';
    return config;
  },
  onResponse: (response) => {
    // 您的响应拦截器逻辑
    return response;
  },
  onError: (error) => {
    // 您的错误处理逻辑
    console.error('发生错误:', error);
  },
});
```

之后，您可以继续使用 Axios 发送请求，拦截器将在请求过程中执行。

```javascript
// 根据需要使用 Axios 实例
myAxios.post('https://api.example.com/data', data)
  .then(response => {
    console.log('Axios response:', response.data);
  })
  .catch(error => {
    console.error('Axios error:', error);
  });
```

### 配置选项

| 属性               | 描述                     | 类型                                   | 默认值      |
| ---------------- | ---------------------- | ------------------------------------ | -------- |
| `instances`      | Axios 实例数组或单个 Axios 实例 | `axiosInstance` / `axiosInstance`\[] | -        |
| `defaultOptions` | 创建新 Axios 实例时要使用的默认选项  | Axios 选项对象                           | {}       |
| `onRequest`      | 请求拦截器逻辑的回调函数           | function(config)                     | config   |
| `onResponse`     | 响应拦截器逻辑的回调函数           | function(response)                   | response |
| `onError`        | 错误处理的回调函数              | function(error)                      | -        |

## Fetch 的全局拦截

### 使用

```javascript
import { setupFetchInterceptor } from 'global-request-interceptor';

setupFetchInterceptor(
  // Request interceptor callback
  onRequest: (url, options) => {
    console.log('Intercepted fetch request:', url, options);
    // Customize request configuration here

    // 1. 拼接地址参数
    // const url = new URL(url as string);
    // url.searchParams.append('version', '123');

    // 2. 添加自定义头部
    // const headers = new Headers(init?.headers);
    // headers.append('Sailing', 'abc');
    // return {
    //   ...init,
    //   headers,
    //   // 在这里可以修改其他请求配置，比如 method、body 等
    //   // 如果需要异步处理，可以返回一个 Promise<RequestInit> 对象
    // };
    return options;
  },
  // Response interceptor callback
  onResponse: async (response) => {
    console.log('Intercepted fetch response:', response);
    // Customize response data here

    // const data = await response.json();
    // console.log('Parsed JSON data:', data);

    return response;
  },
  // Error interceptor callback
  onError: (error) => {
    console.error('Intercepted fetch error:', error);
    // Handle errors that occur during request or response
    throw error;
  }
);
```

之后，您可以继续使用Fetch发送请求，拦截器将在请求过程中执行。

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

### 配置选项

| 属性           | 描述           | 类型                 | 默认值      |
| ------------ | ------------ | ------------------ | -------- |
| `onRequest`  | 请求拦截器逻辑的回调函数 | function(config)   | config   |
| `onResponse` | 响应拦截器逻辑的回调函数 | function(response) | response |
| `onError`    | 错误处理的回调函数    | function(error)    | -        |

## 许可

该项目根据 MIT 许可证进行许可。有关更多信息，请参阅 LICENSE 文件。
