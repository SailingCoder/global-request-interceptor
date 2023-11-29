import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// Configuration interface
interface AxiosInstanceConfig {
  axiosInstance?: AxiosInstance;
  options?: AxiosRequestConfig;
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  responseInterceptor?: (response: AxiosResponse) => AxiosResponse;
  errorCallback?: (error: any) => void;
}

// Create an Axios instance with interceptors
const setupAxiosInstance = (config: AxiosInstanceConfig): AxiosInstance => {
  const { axiosInstance, options, requestInterceptor, responseInterceptor, errorCallback } = config

  const instance: AxiosInstance = axiosInstance || axios.create(options)

  // Request interceptor
  if (requestInterceptor) {
    instance.interceptors.request.use(
      (config) => requestInterceptor(config),
      (error) => Promise.reject(error)
    )
    axios.interceptors.request.use(
      (config) => requestInterceptor(config),
      (error) => Promise.reject(error)
    )
  }

  // Response interceptor
  if (responseInterceptor) {
    instance.interceptors.response.use(
      (response) => responseInterceptor(response),
      (error) => Promise.reject(error)
    )
    axios.interceptors.response.use(
      (response) => responseInterceptor(response),
      (error) => Promise.reject(error)
    )
  }

  // Error callback
  if (errorCallback) {
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        errorCallback(error)
        return Promise.reject(error)
      }
    )
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        errorCallback(error)
        return Promise.reject(error)
      }
    )
  }

  return instance
}

// Export the wrapped Axios instance
export default setupAxiosInstance

// import axios from 'axios'
// import { setupAxiosInstance } from 'global-request-interceptor'
// const customInstance = axios.create({
//   baseURL: 'https://api.example.com',
//   timeout: 5000
// })
// // 使用 setupAxiosInstance 函数创建实例，传递配置对象
// const myAxios = setupAxiosInstance({
//   axiosInstance: customInstance, // 使用用户提供的 axios 实例，不传会生成一个新的 axios 实例
//   requestInterceptor: (config) => {
//     console.log('请求拦截器:', config)
//     return config
//   },
//   responseInterceptor: (response) => {
//     console.log('响应拦截器:', response)
//     return response
//   },
//   errorCallback: (error) => {
//     console.error('发生错误:', error)
//     // 在这里添加自定义的异常处理逻辑
//   }
// })

// // 使用实例进行请求
// myAxios.get('/data')
//   .then((response) => {
//     console.log(response.data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })

// // 使用原始的 axios 实例进行请求
// axios.get('/data')
//   .then((response) => {
//     console.log(response.data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })
// // 使用实例进行请求和使用原始的 axios 实例进行请求的结果是一样的，都可以被拦截到
