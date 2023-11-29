// fetch-instance.ts
type FetchInstance = WindowOrWorkerGlobalScope['fetch'];

interface FetchInstanceConfig {
  fetchInstance?: FetchInstance;
  requestInterceptor?: (url: RequestInfo, options?: RequestInit) => Promise<[RequestInfo, RequestInit]>;
  responseInterceptor?: (response: Response) => Promise<Response>;
  errorCallback?: (error: any) => void;
}

const setupFetchInstance = (config: FetchInstanceConfig): FetchInstance => {
  const {
    fetchInstance, // Fetch 实例
    requestInterceptor, // 请求拦截器
    responseInterceptor, // 响应拦截器
    errorCallback // Fetch 错误
  } = config

  const instance: FetchInstance = fetchInstance || fetch

  const interceptedFetch: FetchInstance = async (
    url: RequestInfo,
    options?: RequestInit
  ): Promise<Response> => {
    try {
      if (requestInterceptor) {
        const [newUrl, newOptions] = await requestInterceptor(url, options)
        url = newUrl
        options = newOptions || options
      }

      const response = await instance(url, options)

      return responseInterceptor ? await responseInterceptor(response) : response
    } catch (error) {
      if (errorCallback) {
        errorCallback(error)
      }
      throw error
    }
  }

  return interceptedFetch
}

export default setupFetchInstance

// import { setupAxiosInstance } from 'global-request-interceptor'

// 使用 setupXhrInstance 进行配置
// const customFetch = setupAxiosInstance({
//   requestInterceptor: async (url:string, options:any) => {
//     console.log('Request interceptor:', url, options)
//     // 可以在这里修改请求
//     return [url, options]
//   },
//   responseInterceptor: async (response: any) => {
//     console.log('Response interceptor:', response)
//     // 可以在这里修改响应
//     return response
//   },
//   errorCallback: (error: any) => {
//     console.error('Error occurred:', error)
//     // 在这里添加自定义的异常处理逻辑，例如提示错误信息
//   }
// })

// // 使用 customFetch 进行请求
// customFetch('https://api.example.com/data')
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })
