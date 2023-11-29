type FetchInstance = WindowOrWorkerGlobalScope['fetch'];
interface FetchInstanceConfig {
    fetchInstance?: FetchInstance;
    requestInterceptor?: (url: RequestInfo, options?: RequestInit) => Promise<[RequestInfo, RequestInit]>;
    responseInterceptor?: (response: Response) => Promise<Response>;
    errorCallback?: (error: any) => void;
}
declare const setupFetchInstance: (config: FetchInstanceConfig) => FetchInstance;
export default setupFetchInstance;
