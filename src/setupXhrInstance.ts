// xhr-instance.ts
interface XhrInstanceConfig {
  requestInterceptor?: (xhr: XMLHttpRequest) => void;
  responseInterceptor?: (xhr: XMLHttpRequest) => void;
  errorCallback?: (xhr: XMLHttpRequest) => void;
}

const setupXhrInstance = (config: XhrInstanceConfig) => {
  const {
    requestInterceptor, // 请求拦截器
    responseInterceptor, // 响应拦截器
    errorCallback // Xhr 错误
  } = config

  const xhr = new XMLHttpRequest()

  const interceptedXhr = async (method: string, url: string, data: any) => {
    return new Promise((resolve, reject) => {
      // 配置请求
      xhr.open(method, url, true)

      // 请求拦截器
      if (requestInterceptor) {
        requestInterceptor(xhr)
      }

      // 设置响应处理函数
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          // 响应拦截器
          if (responseInterceptor) {
            responseInterceptor(xhr)
          }

          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr)
          } else {
            reject(xhr)
          }
        }
      }

      // 错误处理函数
      xhr.onerror = () => {
        if (errorCallback) {
          errorCallback(xhr)
        }
        reject(xhr)
      }

      // 发送请求
      xhr.send(data)
    })
  }

  return interceptedXhr
}

export default setupXhrInstance

// import { setupXhrInstance } from 'global-request-interceptor'

// 使用 setupXhrInstance 进行配置
// const customXhr = setupXhrInstance({
//   requestInterceptor: (xhr) => {
//     console.log('Request interceptor:', xhr)
//     // 可以在这里修改请求
//   },
//   responseInterceptor: (xhr) => {
//     console.log('Response interceptor:', xhr)
//     // 可以在这里修改响应
//   },
//   errorCallback: (xhr) => {
//     console.error('Error occurred:', xhr)
//     // 在这里添加自定义的异常处理逻辑
//   }
// })

// // 使用 customXhr 进行请求
// customXhr('GET', 'https://api.example.com/data', null)
//   .then((xhr) => {
//     console.log(xhr.responseText)
//   })
//   .catch((xhr) => {
//     console.error('Request failed:', xhr)
//   })
