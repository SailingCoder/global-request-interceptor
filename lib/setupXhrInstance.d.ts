interface XhrInstanceConfig {
    onRequest?: (xhr: XMLHttpRequest) => void;
    onResponse?: (response: Response) => void;
    onError?: (error: any) => void;
}
declare const setupXhrInstance: (config: XhrInstanceConfig) => (url: string, options?: any) => Promise<Response>;
export default setupXhrInstance;
