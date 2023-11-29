import setupFetchInstance from './setupFetchInstance'
import setupAxiosInstance from './setupAxiosInstance'
import setupXhrInstance from './setupXhrInstance'

export { setupFetchInstance, setupAxiosInstance, setupXhrInstance }

// export function setupGlobalRequestInterceptor({
//   requestCallback,
//   responseCallback,
//   errorCallback,
//   library = 'axios' // 默认使用 axios
// }: {
//   requestCallback: (request: any) => void;
//   responseCallback?: (response: any) => void;
//   errorCallback?: (error: any) => void;
//   library?: 'axios' | 'fetch';
// }) {
//   if (library === 'fetch') {
//     setupFetchInterceptor(requestCallback, responseCallback, errorCallback);
//   } else if (library === 'axios') {
//     setupAxiosInterceptor(requestCallback, responseCallback, errorCallback);
//   } else {
//     console.error('Invalid library specified. Supported libraries are "axios" and "fetch".');
//   }
// }
