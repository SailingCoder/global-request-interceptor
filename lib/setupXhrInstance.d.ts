interface XhrInstanceConfig {
    requestInterceptor?: (xhr: XMLHttpRequest) => void;
    responseInterceptor?: (xhr: XMLHttpRequest) => void;
    errorCallback?: (xhr: XMLHttpRequest) => void;
}
declare const setupXhrInstance: (config: XhrInstanceConfig) => (method: string, url: string, data: any) => Promise<unknown>;
export default setupXhrInstance;
