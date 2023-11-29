import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
interface AxiosInstanceConfig {
    axiosInstance?: AxiosInstance;
    options?: AxiosRequestConfig;
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    responseInterceptor?: (response: AxiosResponse) => AxiosResponse;
    errorCallback?: (error: any) => void;
}
declare const setupAxiosInstance: (config: AxiosInstanceConfig) => AxiosInstance;
export default setupAxiosInstance;
