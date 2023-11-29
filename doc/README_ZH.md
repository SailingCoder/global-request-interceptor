# 全局请求拦截器

[Read English](../README.md)  <!-- 添加跳转链接 -->

`global-request-interceptor` 是一个简单灵活的 JavaScript 库，用于在全局范围内拦截网络请求。该库支持 Axios、Fetch 和 XMLHttpRequest (XHR) 三种主流的网络请求方式，让你能够方便地添加全局处理逻辑、记录请求和响应、处理错误等，提高了应用程序的可维护性和灵活性。

### 特性

- **支持 Axios、Fetch 和 XHR：** 提供了针对 Axios、Fetch 和 XHR 的拦截器，让你能够选择使用其中一种、两种或全部三种同时使用。

- **全局拦截器：** 可以设置请求拦截、响应拦截和错误拦截器，这些拦截器将在整个应用程序的所有请求中生效。

- **灵活配置：** 通过回调函数，你可以在拦截器中执行自定义逻辑，比如修改请求配置、记录日志、处理错误等。

### 安装

使用 npm 进行安装：

```bash
npm install global-request-interceptor
```

### 使用

#### 使用 Axios 进行全局拦截

```javascript
import axios from 'axios';
import { setupAxiosInterceptor } from 'global-request-interceptor';

setupAxiosInterceptor({
  requestCallback: config => {
    console.log('Intercepted Axios request:', config);
    // 在这里可以修改请求配置
    // 如：url += '?token=123456789'; url = 'https://****.com/' + url
    return config;
  },
  responseCallback: response => {
    console.log('Intercepted Axios response:', response);
    // 在这里可以修改响应数据
    return response;
  },
  errorCallback: error => {
    console.error('Intercepted Axios error:', error);
    // 在这里可以处理请求或响应发生的错误
    return Promise.reject(error);
  }
});
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

#### 使用 Fetch 进行全局拦截

```javascript
import { setupFetchInterceptor } from 'global-request-interceptor';

setupFetchInterceptor(
  // 请求拦截器回调
  (url, options) => {
    console.log('Intercepted fetch request:', url, options);
    // 在这里可以修改请求配置
    // 如：url += '?token=123456789'; url = 'https://****.com/' + url
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

#### 使用 XHR 进行全局拦截

```javascript
import { setupXhrInterceptor } from 'global-request-interceptor';

setupXhrInterceptor(
  // 请求拦截器回调
  info => {
    console.log('Intercepted XHR request:', info);
    // 在这里可以修改请求配置
    // info.url += '?token=123456789';
    // info.url = 'https://****.com/' + info.url;
  },
  // 响应拦截器回调
  info => {
    console.log('Intercepted XHR response:', info);
    // 在这里可以修改响应数据
  },
  // 错误拦截器回调
  error => {
    console.error('Intercepted XHR error:', error);
    // 在这里可以处理请求或响应发生的错误
    throw error;
  }
);
```

## 许可证

本项目基于 MIT 许可证。有关更多信息，请参阅 LICENSE 文件。
