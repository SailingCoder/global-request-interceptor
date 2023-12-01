import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Configuration interface
interface AxiosInstanceConfig {
  instances?: AxiosInstance | AxiosInstance[];
  defaultOptions?: AxiosRequestConfig;
  onRequest?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  onResponse?: (response: AxiosResponse) => AxiosResponse;
  onError?: (error: any) => void;
}

// Create Axios instances with interceptors
const setupAxiosInstance = (config: AxiosInstanceConfig = {}): AxiosInstance | AxiosInstance[] => {
  const { instances, defaultOptions, onRequest, onResponse, onError } = config;

  let axiosInstances: AxiosInstance | AxiosInstance[];

  if (Array.isArray(instances)) {
    axiosInstances = instances;
  } else {
    axiosInstances = instances ? [instances] : [axios.create(defaultOptions || {})];
  }

  if (Array.isArray(axiosInstances)) {
    axiosInstances.forEach((instance) => {
      // Request interceptor
      if (onRequest) {
        instance.interceptors.request.use(
          (config): any => onRequest(config),
          (error) => Promise.reject(error)
        );
      }

      // Response interceptor
      if (onResponse) {
        instance.interceptors.response.use(
          (response) => onResponse(response),
          (error) => Promise.reject(error)
        );
      }

      // Error callback
      if (onError) {
        instance.interceptors.response.use(
          (response) => response,
          (error) => {
            onError(error);
            return Promise.reject(error);
          }
        );
      }
    });
  }

  return axiosInstances.length === 1 ? axiosInstances[0] : axiosInstances;
};

// Export the wrapped Axios instances
export default setupAxiosInstance;
