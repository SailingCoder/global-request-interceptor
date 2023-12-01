import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
interface AxiosInstanceConfig {
    instances?: AxiosInstance | AxiosInstance[];
    defaultOptions?: AxiosRequestConfig;
    onRequest?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    onResponse?: (response: AxiosResponse) => AxiosResponse;
    onError?: (error: any) => void;
}
declare const setupAxiosInstance: (config?: AxiosInstanceConfig) => AxiosInstance | AxiosInstance[];
export default setupAxiosInstance;
