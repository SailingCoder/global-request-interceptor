# Global Request Interceptor

[简体中文](./doc/README_ZH.md)  <!-- 添加跳转链接 -->

[![npm version](https://badge.fury.io/js/global-request-interceptor.svg)](https://badge.fury.io/js/global-request-interceptor)

`global-request-interceptor` is a simple yet flexible JavaScript library designed for intercepting network requests globally. This library supports Axios, Fetch, and XMLHttpRequest (XHR), allowing you to easily add global processing logic, log requests and responses, handle errors, and enhance the maintainability and flexibility of your application.

## Features

-   **Support for Axios, Fetch, and XHR:** Provides interceptors for Axios, Fetch, and XHR, giving you the option to use one, two, or all three simultaneously.
-   **Global Interceptors:** Set up request, response, and error interceptors that will take effect across all requests in your entire application.
-   **Flexible Configuration:** Through callback functions, you can execute custom logic within interceptors, such as modifying request configurations, logging, error handling, and more.

## Installation

Install using npm:

```bash
npm install global-request-interceptor
```

Install using yarn:

```bash
yarn add global-request-interceptor
```

## Global Interception with Axios

### Usage

1. Set up interceptors for multiple instances:

```javascript
import { setupAxiosInterceptor } from 'global-request-interceptor';

// Configuration example with multiple instances
setupAxiosInterceptor({
  instances: [axiosInstance1, axiosInstance2],
  onRequest: (config) => {
    // Your request interceptor logic
    // config.url += '?token=123456789'; 
    // config.headers['Sailing'] = 'abc';
    return config;
  },
  onResponse: (response) => {
    // Your response interceptor logic
    return response;
  },
  onError: (error) => {
    // Your error callback logic
    console.error('An error occurred:', error);
  },
});
```

Afterwards, you can continue using Fetch to send requests, and the interceptors will execute during the request process.

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

2. Set up interceptors for a single instance:

```javascript
import { setupAxiosInterceptor } from 'global-request-interceptor';

// Configuration example for a single instance
setupAxiosInterceptor({
  instances: axiosInstance,
  onRequest: (config) => {
    // Your request interceptor logic
    // config.url += '?token=123456789'; 
    // config.headers['Sailing'] = 'abc';
    return config;
  },
  onResponse: (response) => {
    // Your response interceptor logic
    return response;
  },
  onError: (error) => {
    // Your error callback logic
    console.error('An error occurred:', error);
  },
});
```

Afterwards, you can continue using Fetch to send requests, and the interceptors will execute during the request process.

```javascript
axiosInstance.get('https://api.example.com/data')
```

3. Create a new instance, set default options, and set interceptors

```javascript
import { setupAxiosInterceptor } from 'global-request-interceptor';

// Configuration example for creating a new instance with default options
const myAxios = setupAxiosInterceptor({
  defaultOptions: { baseURL: 'https://api.example.com' },
  onRequest: (config) => {
    // Your request interceptor logic
    // config.url += '?token=123456789'; 
    // config.headers['Sailing'] = 'abc';
    return config;
  },
  onResponse: (response) => {
    // Your response interceptor logic
    return response;
  },
  onError: (error) => {
    // Your error callback logic
    console.error('An error occurred:', error);
  },
});
```

Afterwards, you can continue using Fetch to send requests, and the interceptors will execute during the request process.

```javascript
myAxios.post('https://api.example.com/data', data)
  .then(response => {
    console.log('Axios response:', response.data);
  })
  .catch(error => {
    console.error('Axios error:', error);
  });
```

### Configuration Options

| Property | Description |Type |Default Value|
| --- | --- | --- | --- |
| `instances` | An array of Axios instances or a single Axios instance | `axiosInstance` / `axiosInstance`[]  | - |  
| `defaultOptions` | Default options to be used when creating a new Axios instance | Axios Options Object  | {} |  
| `onRequest` | Callback function for request interceptor logic | function(config)  | config |  
| `onResponse` | Callback function for response interceptor logic | function(response)  | response | 
| `onError` | Callback function for error handling | function(error)  | - | 

## Global Interception with Fetch

### Usage

```javascript
import { setupFetchInterceptor } from 'global-request-interceptor';

setupFetchInterceptor(
  // Request interceptor callback
  onRequest: (url, options) => {
    console.log('Intercepted fetch request:', url, options);
    // Customize request configuration here

    // 1. Append URL parameters
    // const url = new URL(url as string);
    // url.searchParams.append('version', '123');

    // 2. Add custom headers
    // const headers = new Headers(init?.headers);
    // headers.append('Sailing', 'abc');
    // return {
    //   ...init,
    //   headers,
    //   // Modify other request configurations here, such as method, body, etc.
    //   // If asynchronous processing is needed, you can return a Promise<RequestInit> object
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
### Configuration Options

| Property | Description |Type |Default Value|
| --- | --- | --- | --- |
| `onRequest` | Callback function for request interceptor logic | function(config)  | config |  
| `onResponse` | Callback function for response interceptor logic | function(response)  | response | 
| `onError` | Callback function for error handling | function(error)  | - | 

## License

This project is licensed under the MIT License. For more information, please see the LICENSE file.
